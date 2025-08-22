package com.example.employee_restapi_test.repositories.projection;

import java.time.LocalDate;
import java.time.LocalDateTime;

public interface EmployeeProjection {
    Long getId();
    String getFullName();
    String getEmail();
    LocalDate getDateOfBirth();
    String getGender();
    String getPhoneNumber();
    Boolean getActive();
    LocalDateTime getCreatedAt();
    // LocalDateTime getUpdatedAt();
}
