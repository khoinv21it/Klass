package com.example.employee_restapi_test.entities;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.example.employee_restapi_test.enums.Gender;
import com.example.employee_restapi_test.enums.convert.GenderConvert;

import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "employees")
@Getter
@Setter
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "email", unique = true)
    private String email;

    private LocalDate dateOfBirth;

    @Convert(converter = GenderConvert.class)
    private Gender gender;

    @Column(name = "phone_number", length = 10)
    private String phoneNumber;

    private Boolean active;

    private String hashedPassword;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    void prePersist() {
        createdAt = LocalDateTime.now();
        updatedAt = createdAt;
    }

    @PreUpdate
    void preUpdate() {
        updatedAt = LocalDateTime.now();
    }
    
}
