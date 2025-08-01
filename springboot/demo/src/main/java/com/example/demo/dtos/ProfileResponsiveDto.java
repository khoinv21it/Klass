package com.example.demo.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Builder
@AllArgsConstructor
@Data
public class ProfileResponsiveDto {
    private Long id;
    private String name;
    private String email;
    private String phoneNumber;
    private String address;

}
