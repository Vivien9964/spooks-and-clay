package com.spooksandclay.backend.order;

public record OrderItemDto(
        Long id,
        Long productId,
        String productName,
        String price,
        Integer quantity
) {}
