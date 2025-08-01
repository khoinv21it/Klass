package com.example.demo.repositories;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Profile;

@Repository
public interface ProfileJpaRepository extends JpaRepository<Profile, Long> {
    // Additional query methods can be defined here if needed
    @EntityGraph(attributePaths = {"firstName", "lastName", "phoneNumber", "address", "email"})
    Profile findByUsername(String username);
}
