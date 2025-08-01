package com.example.demo.utils;

import com.example.demo.enums.AuthUserStatus;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class AuthUserStatusConverter implements AttributeConverter<AuthUserStatus, String> {
    @Override
    public String convertToDatabaseColumn(AuthUserStatus status) {
        return (status == null) ? null : String.valueOf(status.getStatus());
    }

    @Override
    public AuthUserStatus convertToEntityAttribute(String dbData) {
        return (dbData == null || dbData.isEmpty()) ? null : AuthUserStatus.fromStatus(Integer.parseInt(dbData));
    }
}
