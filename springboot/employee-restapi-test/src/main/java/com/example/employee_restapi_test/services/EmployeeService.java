package com.example.employee_restapi_test.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.employee_restapi_test.dtos.EmployeeCreateRequestDto;
import com.example.employee_restapi_test.dtos.EmployeeResponseDto;
import com.example.employee_restapi_test.dtos.EmployeeResponseUpdateDto;
import com.example.employee_restapi_test.dtos.EmployeeUpdateRequestDto;
import com.example.employee_restapi_test.entities.Employee;
import com.example.employee_restapi_test.enums.Gender;
import com.example.employee_restapi_test.repositories.EmployeeJpaRepository;
import com.example.employee_restapi_test.repositories.projection.EmployeeProjection;

@Service
public class EmployeeService {
    @Autowired
    private EmployeeJpaRepository employeeJpaRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public EmployeeResponseDto convertToDto(Employee newEmployee) {
        return EmployeeResponseDto.builder()
                .id(newEmployee.getId())
                .fullName(newEmployee.getFullName())
                .email(newEmployee.getEmail())
                .dateOfBirth(newEmployee.getDateOfBirth())
                .gender(newEmployee.getGender())
                .phoneNumber(newEmployee.getPhoneNumber())
                .active(newEmployee.getActive())
                .createdAt(newEmployee.getCreatedAt())
                .build();
    }

    // conver projection to DTO
    public EmployeeResponseDto convertToDto(EmployeeProjection employeeProjection) {
        return EmployeeResponseDto.builder()
                .id(employeeProjection.getId())
                .fullName(employeeProjection.getFullName())
                .email(employeeProjection.getEmail())
                .dateOfBirth(employeeProjection.getDateOfBirth())
                .gender(employeeProjection.getGender() != null ? Gender.valueOf(employeeProjection.getGender()) : null)
                .phoneNumber(employeeProjection.getPhoneNumber())
                .active(employeeProjection.getActive())
                .createdAt(employeeProjection.getCreatedAt())
                .build();
    }

    public EmployeeResponseUpdateDto convertUpdateToDto(Employee newEmployee) {
        return EmployeeResponseUpdateDto.builder()
                .fullName(newEmployee.getFullName())
                .dateOfBirth(newEmployee.getDateOfBirth())
                .phoneNumber(newEmployee.getPhoneNumber())
                .gender(newEmployee.getGender())
                .build();
    }

    public EmployeeResponseDto createEmployee(EmployeeCreateRequestDto employee) {
        Optional<Employee> existing = employeeJpaRepository.findByEmail(employee.getEmail());
        if (existing.isPresent()) {
            throw new IllegalArgumentException("Email already exists");
        }
        Employee newEmployee = new Employee();
        newEmployee.setFullName(employee.getFullName());
        newEmployee.setEmail(employee.getEmail());
        newEmployee.setDateOfBirth(employee.getDateOfBirth());
        newEmployee.setGender(employee.getGender());
        newEmployee.setActive(true); // Assuming new employees are active by default
        newEmployee.setPhoneNumber(employee.getPhoneNumber());
        newEmployee.setHashedPassword(passwordEncoder.encode(employee.getPassword())); // Assuming password is hashed
        Employee saved = employeeJpaRepository.save(newEmployee);
        return convertToDto(saved);
    }

    public List<EmployeeResponseDto> getAllEmployee() {
        List<EmployeeProjection> employees = employeeJpaRepository.findAllBy();
        return employees.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public EmployeeResponseDto getEmployeeById(Long id) {
        Optional<EmployeeProjection> employeeProjection = employeeJpaRepository.findProjectedById(id);
        if (employeeProjection.isPresent()) {
            return convertToDto(employeeProjection.get());
        }
        throw new IllegalArgumentException("Employee not found");
    }

    public EmployeeResponseUpdateDto updateEmployee(Long id, EmployeeUpdateRequestDto employeeUpdateRequest) {
        Employee existing = employeeJpaRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Employee not found"));
        existing.setFullName(employeeUpdateRequest.getFullName());
        existing.setDateOfBirth(java.time.LocalDate.parse(employeeUpdateRequest.getDateOfBirth()));
        existing.setGender(employeeUpdateRequest.getGender());
        existing.setPhoneNumber(employeeUpdateRequest.getPhoneNumber());

        employeeJpaRepository.save(existing);
        return convertUpdateToDto(existing);
    }

    public void deleteEmployee(Long id) {
        Optional<EmployeeProjection> employeeProjection = employeeJpaRepository.findProjectedById(id);
        if (employeeProjection.isPresent()) {
            employeeJpaRepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("Employee not found");
        }
    }

    // check if email exists
    public boolean emailExists(String email) {
        return employeeJpaRepository.findByEmail(email).isPresent();
    }
}
