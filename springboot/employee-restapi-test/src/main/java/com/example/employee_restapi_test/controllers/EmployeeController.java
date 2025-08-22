package com.example.employee_restapi_test.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.employee_restapi_test.dtos.EmployeeCreateRequestDto;
import com.example.employee_restapi_test.dtos.EmployeeResponseDto;
import com.example.employee_restapi_test.dtos.EmployeeResponseUpdateDto;
import com.example.employee_restapi_test.dtos.EmployeeUpdateRequestDto;
import com.example.employee_restapi_test.services.EmployeeService;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @PostMapping
    public ResponseEntity<EmployeeResponseDto> createEmployee(
            @RequestBody EmployeeCreateRequestDto employeeCreateRequestDto) {
        EmployeeResponseDto createdEmployee = employeeService.createEmployee(employeeCreateRequestDto);
        return ResponseEntity.ok(createdEmployee);
    }

    @GetMapping()
    public ResponseEntity<List<EmployeeResponseDto>> getAllEmployees() {
        List<EmployeeResponseDto> employees = employeeService.getAllEmployee();
        return ResponseEntity.ok(employees);
    }

    @GetMapping("{id}")
    public ResponseEntity<EmployeeResponseDto> getEmployeeById(@PathVariable("id") Long id) {
        EmployeeResponseDto employee = employeeService.getEmployeeById(id);
        return ResponseEntity.ok(employee);
    }

    @PutMapping("{id}")
    public ResponseEntity<EmployeeResponseUpdateDto> updateEmployee(@PathVariable("id") Long id,
            @RequestBody EmployeeUpdateRequestDto employeeUpdateRequest) {
        EmployeeResponseUpdateDto updatedEmployee = employeeService.updateEmployee(id, employeeUpdateRequest);
        return ResponseEntity.ok(updatedEmployee);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable("id") Long id) {
        employeeService.deleteEmployee(id);
        return ResponseEntity.noContent().build();
    }
}
