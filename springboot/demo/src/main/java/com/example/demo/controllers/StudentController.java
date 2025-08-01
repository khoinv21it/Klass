package com.example.demo.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dtos.StudentResponseDto;
import com.example.demo.services.StudentService;


@RestController
@RequestMapping("/api/students")
public class StudentController {
    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    // @GetMapping()
    // public List<StudentResponseDto> getAllStudents() {
    //     return this.studentService.getAllStudents();
    // }

}
