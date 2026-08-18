package com.spooksandclay.backend.error;

public class SelfRoleChangeException extends RuntimeException {
    public SelfRoleChangeException(String message) {
        super(message);
    }
}
