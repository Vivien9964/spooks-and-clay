package com.spooksandclay.backend.product;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;

import java.math.BigDecimal;
import java.util.List;

public record CreateProductRequest(
       @NotBlank String name,
        @NotBlank String slug,
        String shortDesc,
        String longDesc,
        @NotNull @Positive BigDecimal price,
        boolean onSale,
        Integer discountPercent,
        @PositiveOrZero  Integer stockCount,
        @NotBlank String category,
        @Valid List<ProductImageDto> images

) {}
