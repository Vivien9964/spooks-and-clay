package com.spooksandclay.backend.product;

import jakarta.validation.constraints.NotBlank;

public record ProductImageDto(@NotBlank String src, @NotBlank String alt) {}
