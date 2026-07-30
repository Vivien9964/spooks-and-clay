package com.spooksandclay.backend.user;

public record UserDto(
        Long id,
        String name,
        String email,
        String role
) {}
