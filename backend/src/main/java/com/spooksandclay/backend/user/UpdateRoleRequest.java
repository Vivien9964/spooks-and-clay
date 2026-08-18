package com.spooksandclay.backend.user;

import jakarta.validation.constraints.NotNull;

public record UpdateRoleRequest(@NotNull Role role) {}
