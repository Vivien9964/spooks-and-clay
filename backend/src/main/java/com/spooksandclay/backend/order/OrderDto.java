package com.spooksandclay.backend.order;

import java.util.List;

public record OrderDto(
        Long id,
        Long userId,
        String status,
        String createdAt,
        List<OrderItemDto> items
) {
}
