package com.spooksandclay.backend.order;

import jakarta.validation.constraints.NotBlank;

public record UpdateOrderStatusRequest(
        @NotBlank String status
) {}
