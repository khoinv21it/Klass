package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dtos.ProfileResponsiveDto;
import com.example.demo.entities.Profile;
import com.example.demo.repositories.ProfileJpaRepository;

@Service
public class ProfileService {
    @Autowired
    private ProfileJpaRepository profileJpaRepository;
    
    private ProfileResponsiveDto convertToDto(Profile profile) {
        ProfileResponsiveDto profileDto = new ProfileResponsiveDto(null, null, null, null, null);
        profileDto.setId(profile.getId());
        profileDto.setName(profile.getFirstName() + " " + profile.getLastName());
        profileDto.setEmail(profile.getEmail());
        profileDto.setPhoneNumber(profile.getPhoneNumber());
        profileDto.setAddress(profile.getAddress());
        return profileDto;
    }

    public ProfileResponsiveDto getProfileByUsername(String username) {
        Profile profile = profileJpaRepository.findByUsername(username);
        if (profile == null) {
            throw new RuntimeException("Profile not found for username: " + username);
        }
        return convertToDto(profile);
    }
}
