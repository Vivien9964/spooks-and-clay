package com.spooksandclay.backend.order;

import java.util.List;

public record CreateOrderRequest(
        Long userId,
        List<OrderItemRequest> items
) {}
