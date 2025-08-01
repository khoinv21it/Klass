package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Student;

@Repository
public interface StudentJpaRepository extends JpaRepository<Student, Long>, JpaSpecificationExecutor<Student> {

    // Avoid query N + 1 problem by using LEFT JOIN FETCH
    @Query("SELECT s FROM Student s LEFT JOIN FETCH s.department LEFT JOIN FETCH s.courses")
    List<Student> getAllStudents();

    // Avoid query N + 1 problem by using EntityGraph
    @EntityGraph(attributePaths = { "department", "courses" })
    List<Student> findByEmail(String email);

    // Avoid query N + 1 problem by using EntityGraph
    // @EntityGraph(value = "Student.WithDepartmentAndCourses", type = EntityGraph.EntityGraphType.LOAD)
    // List<Student> findByDeleted(boolean deleted);

  
}