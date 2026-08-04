package com.spooksandclay.backend.user;

public record AuthResponse(
        String token,
        UserDto user
) {}
