package com.example.employee_restapi_test.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.employee_restapi_test.entities.Employee;
import com.example.employee_restapi_test.repositories.projection.EmployeeProjection;
import com.example.employee_restapi_test.repositories.projection.EmployeeResponseUpdateProjection;

@Repository
public interface EmployeeJpaRepository extends JpaRepository<Employee, Long> {
    // Additional query methods can be defined here if needed
    Optional<EmployeeProjection> findProjectedById(Long id);
    List<EmployeeProjection> findAllBy();
    
    // get using EmployeeResponseUpdateProjection
    Optional<EmployeeResponseUpdateProjection> findUpdateProjectionById(Long id);

    Optional<Employee> findByEmail(String email);

}
