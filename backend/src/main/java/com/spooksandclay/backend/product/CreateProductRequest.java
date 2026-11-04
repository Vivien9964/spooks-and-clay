package com.spooksandclay.backend.product;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;

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
       @NotNull @PositiveOrZero Integer stockCount,
        @NotBlank String category,
        @Valid List<ProductImageDto> images,
        boolean featured,
       @NotNull @DecimalMin("0.1") @Digits(integer = 3, fraction = 1) BigDecimal heightCm,
       @NotNull @DecimalMin("0.1") @Digits(integer = 3, fraction = 1) BigDecimal widthCm,
       @NotNull @Positive Integer weightG,
       @NotEmpty List<@NotBlank @Size(max = 100) String> materials

       ) {}
