package com.example.employee_restapi_test.dtos;

import java.time.LocalDate;

import com.example.employee_restapi_test.enums.Gender;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmployeeCreateRequestDto {
    @NotBlank
    @Size(min = 4, max = 160)
    private String fullName;

    @Email
    @NotBlank
    private String email;

    private LocalDate dateOfBirth;
    private Gender gender;
    @Pattern(regexp = "^[0-9]{10}$", message = "Phone number must be 10 digits")
    private String phoneNumber;

    @NotBlank
    private String password;
}
