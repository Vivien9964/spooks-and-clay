package com.spooksandclay.backend.order;

public record OrderItemRequest(
        Long productId,
        Integer quantity
) {}
