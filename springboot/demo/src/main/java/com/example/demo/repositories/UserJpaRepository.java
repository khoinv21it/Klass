package com.example.demo.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.User;

@Repository
public interface UserJpaRepository extends JpaRepository<User, Long> {
    // Additional query methods can be defined here if needed
    @EntityGraph(attributePaths = { "roles" })
    Optional<User> findByUsername(String username);
}
