package com.example.demo.dtos;

import java.util.List;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class LoginResponseDto {
    Long id;
    String username;
    List<String> roles;
    String accessToken;
    String refreshToken;
}