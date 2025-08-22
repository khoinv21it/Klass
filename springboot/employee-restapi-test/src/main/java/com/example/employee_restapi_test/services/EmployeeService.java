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
import com.example.employee_restapi_test.repositories.projection.EmployeeResponseUpdateProjection;

@Service
public class EmployeeService {
    @Autowired
    private EmployeeJpaRepository employeeJpaRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public EmployeeResponseDto convertToDto(Employee newEmployee) {
        return EmployeeResponseDto.builder()
                .fullName(newEmployee.getFullName())
                .email(newEmployee.getEmail())
                .dateOfBirth(newEmployee.getDateOfBirth())
                .gender(newEmployee.getGender())
                .phoneNumber(newEmployee.getPhoneNumber())
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
        Employee newEmployee = new Employee();
        newEmployee.setFullName(employee.getFullName());
        newEmployee.setEmail(employee.getEmail());
        newEmployee.setDateOfBirth(employee.getDateOfBirth());
        newEmployee.setGender(employee.getGender());
        newEmployee.setActive(true); // Assuming new employees are active by default
        newEmployee.setPhoneNumber(employee.getPhoneNumber());
        newEmployee.setHashedPassword(passwordEncoder.encode(employee.getPassword())); // Assuming password is hashed
        employeeJpaRepository.save(newEmployee);
        return convertToDto(newEmployee);
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
        Optional<EmployeeResponseUpdateProjection> optionalEmployee = employeeJpaRepository.findUpdateProjectionById(id);
        if (optionalEmployee.isPresent()) {
            Employee newEmployee = new Employee();
            newEmployee.setFullName(employeeUpdateRequest.getFullName());
            newEmployee.setDateOfBirth(employeeUpdateRequest.getDateOfBirth());
            newEmployee.setGender(employeeUpdateRequest.getGender());
            newEmployee.setPhoneNumber(employeeUpdateRequest.getPhoneNumber());

            employeeJpaRepository.save(newEmployee);
            return convertUpdateToDto(newEmployee);
        }
        throw new IllegalArgumentException("Employee not found");
    }

    public void deleteEmployee(Long id) {
        Optional<EmployeeProjection> employeeProjection = employeeJpaRepository.findProjectedById(id);
        if (employeeProjection.isPresent()) {
            employeeJpaRepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("Employee not found");
        }
    }
    
}
