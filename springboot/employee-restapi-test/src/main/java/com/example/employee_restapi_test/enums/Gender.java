package com.example.employee_restapi_test.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum Gender {
    MALE(0),
    FEMALE(1),
    OTHER(2);

    private final int code;

    Gender(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }

    @JsonValue
    public String toValue() {
        return this.name();
    }

    @JsonCreator
    public static Gender fromValue(String value) {
        if (value == null) {
            return null;
        }

        String v = value.trim();

        // Match by name case-insensitively
        for (Gender gender : Gender.values()) {
            if (gender.name().equalsIgnoreCase(v)) {
                return gender;
            }
        }

        // Try parse numeric code
        try {
            int code = Integer.parseInt(v);
            return fromCode(code);
        } catch (NumberFormatException ignored) {
        }

        throw new IllegalArgumentException("Unknown gender: " + value);
    }

    public static Gender fromCode(int code) {
        for (Gender gender : Gender.values()) {
            if (gender.getCode() == code) {
                return gender;
            }
        }
        throw new IllegalArgumentException("Unknown gender code: " + code);
    }
}
