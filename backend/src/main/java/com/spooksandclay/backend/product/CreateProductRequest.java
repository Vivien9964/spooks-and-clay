package com.spooksandclay.backend.product;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;

public record CreateProductRequest(
       @NotBlank String name,
        @NotBlank String slug,
        String shortDesc,
        String longDesc,
        @NotBlank String price,
        boolean onSale,
        Integer discountPercent,
        @PositiveOrZero  Integer stockCount,
        @NotBlank String category
) {}
