package com.spooksandclay.backend.order;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record OrderItemRequest(
       @NotNull Long productId,
        @NotNull @Positive Integer quantity
) {}
