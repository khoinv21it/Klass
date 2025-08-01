package com.example.demo.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.demo.dtos.CourseResponseDto;
import com.example.demo.dtos.DepartmentResponseDto;
import com.example.demo.dtos.StudentResponseDto;
import com.example.demo.entities.Student;
import com.example.demo.repositories.StudentJpaRepository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

@Service
public class StudentService {
    @PersistenceContext
    private EntityManager em;
    private final StudentJpaRepository studentJpaRepository;

    public StudentService(StudentJpaRepository studentJpaRepository) {
        this.studentJpaRepository = studentJpaRepository;
    }

    // create method convert entity to dto
    private StudentResponseDto convertToDto(Student student) {
        StudentResponseDto studentDto = new StudentResponseDto();
        studentDto.setId(student.getId());
        studentDto.setName(student.getName());
        studentDto.setEmail(student.getEmail());
        studentDto.setAddress(student.getAddress());
        if (student.getDepartment() != null) {
            DepartmentResponseDto departmentDto = new DepartmentResponseDto();
            departmentDto.setId(student.getDepartment().getId());
            departmentDto.setName(student.getDepartment().getName());
            studentDto.setDepartments(List.of(departmentDto));
        }
        if (student.getCourses() != null) {
            List<CourseResponseDto> courseDtos = student.getCourses().stream()
                    .map(course -> {
                        CourseResponseDto courseDto = new CourseResponseDto();
                        courseDto.setId(course.getId());
                        courseDto.setName(course.getName());
                        return courseDto;
                    })
                    .collect(Collectors.toList());
            studentDto.setCourses(courseDtos);
        }
        return studentDto;
    }

    // @Transactional
    // public List<StudentResponseDto> getAllStudents() {
    //     List<Student> students = this.studentJpaRepository.getAllStudents();

    //     // Convert to DTOs
    //     return students.stream()
    //             .map(this::convertToDto)
    //             .collect(Collectors.toList());
    // }

    // // Example method to find a student by email
    // public List<StudentResponseDto> findByEmail(String email) {
    //     List<Student> students = studentJpaRepository.findByEmail(email);
    //     return students.stream()
    //             .map(this::convertToDto)
    //             .collect(Collectors.toList());
    // }
}