package com.example.demo.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.cache.annotation.CachePut;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.example.demo.dtos.CourseResponseDto;
import com.example.demo.dtos.CreateStudentRequestDto;
import com.example.demo.dtos.DepartmentResponseDto;
import com.example.demo.dtos.StudentResponseDto;
import com.example.demo.dtos.UpdateStudentRequestDto;
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

    @CacheEvict(value = "students", allEntries = true)
    public StudentResponseDto createStudent(CreateStudentRequestDto createStudentRequestDto) {

        Student student = new Student();
        student.setName(createStudentRequestDto.getName());
        student.setEmail(createStudentRequestDto.getEmail());
        student.setAddress(createStudentRequestDto.getAddress());
        student.setPassword(createStudentRequestDto.getPassword());

        Student createdStudent = this.studentJpaRepository.save(student);
        return convertToDto(createdStudent);
    }


    @Cacheable(value = "students", key = "'#id'")
    public StudentResponseDto getStudentById(Long id) {
        System.out.println("Fetching student with ID: " + id);
        Student student = this.studentJpaRepository.findById(id).orElseThrow();
        return convertToDto(student);
    }

    @Cacheable(value = "students", key = "'all'")
    @Transactional
    public List<StudentResponseDto> getAllStudents() {

        System.out.println("🌚🌚🌚🌚🌚Fetching all students from the database...");
        List<Student> students = this.studentJpaRepository.getAllStudents();

        // Convert to DTOs
        return students.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @CachePut(value = "students", key = "'#id'")
    @CacheEvict(value = "students", key = "'all'")
    public StudentResponseDto updateStudent(Long id, UpdateStudentRequestDto student) {
        Student existingStudent = this.studentJpaRepository.findById(id).orElseThrow();
        existingStudent.setName(student.getName());
        existingStudent.setAddress(student.getAddress());
        Student updatedStudent = this.studentJpaRepository.save(existingStudent);
        return convertToDto(updatedStudent);
    }

    // Example method to find a student by email
    public List<StudentResponseDto> findByEmail(String email) {
        List<Student> students = studentJpaRepository.findByEmail(email);
        return students.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
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
}