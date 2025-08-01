package com.example.demo.enums;

import lombok.Getter;

@Getter
public enum AuthUserStatus {
    DISABLED(0), ENABLED(1);

    private final int status;
    AuthUserStatus(int status) {
        this.status = status;
    }

    public static AuthUserStatus fromStatus(int status) {
        for (AuthUserStatus userStatus : AuthUserStatus.values()) {
            if (userStatus.getStatus() == status) {
                return userStatus;
            }
        }
        throw new IllegalArgumentException("Invalid status: " + status);
    }
}
