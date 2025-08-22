package com.example.employee_restapi_test.enums.convert;

import com.example.employee_restapi_test.enums.Gender;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class GenderConvert implements AttributeConverter<Gender, Integer> {

    @Override
    public Integer convertToDatabaseColumn(Gender gender) {
        return gender != null ? gender.getCode() : null;
    }

    @Override
    public Gender convertToEntityAttribute(Integer code) {
        return code != null ? Gender.fromCode(code) : null;
    }
}
