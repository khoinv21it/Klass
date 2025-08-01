package com.example.demo.dtos;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentResponseDto {
    private Long id;
    private String name;
    private String email;
    private String password;
    private String address;
    private List<DepartmentResponseDto> departments;
    private List<CourseResponseDto> courses;
}
