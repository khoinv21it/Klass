package com.example.employee_restapi_test.dtos;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.example.employee_restapi_test.enums.Gender;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeResponseDto {
    private Long id;
    private String fullName;
    private String email;
    private LocalDate dateOfBirth;
    private Gender gender;
    private String phoneNumber;
    private Boolean active;
    private LocalDateTime createdAt;
    // private LocalDateTime updatedAt;
}
