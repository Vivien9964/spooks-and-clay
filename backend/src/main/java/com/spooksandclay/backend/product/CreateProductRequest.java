package com.spooksandclay.backend.product;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.util.List;

public record CreateProductRequest(
        @NotBlank @Size(max = 255) String name,
        @NotBlank @Pattern(regexp = "[a-z0-9]+(-[a-z0-9]+)*", message = "Use lowercase letters, numbers and single dashes") String slug,
        @Size(max = 500) String shortDesc,
        @Size(max = 4000) String longDesc,
        @NotNull @Positive BigDecimal price,
        boolean onSale,
        @Min(1) @Max(90) Integer discountPercent,
        @NotNull @PositiveOrZero Integer stockCount,
        @NotBlank @Pattern(regexp = "autumnScenes|halloweenScenes|collections") String category,
        @NotEmpty @Valid List<ProductImageDto> images,
        boolean featured,
        @NotNull Boolean active,
        @NotNull @DecimalMin("0.1") @Digits(integer = 3, fraction = 1) BigDecimal heightCm,
        @NotNull @DecimalMin("0.1") @Digits(integer = 3, fraction = 1) BigDecimal widthCm,
        @NotNull @Positive Integer weightG,
        @NotEmpty List<@NotBlank @Size(max = 100) String> materials
) {

       @AssertTrue(message = "Discount is required when the product is on sale")
       public boolean isDiscountSetWhenOnSale() {
              return !onSale || discountPercent != null;
       }
}