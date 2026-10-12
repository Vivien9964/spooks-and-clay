package com.spooksandclay.backend.order;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

import java.util.List;

public record CreateOrderRequest(
       @NotEmpty @Valid List<OrderItemRequest> items,
       @NotBlank @Size(max = 255) String recipientName,
       @NotBlank @Size(max = 255) String street,
       @NotBlank @Size(max = 255) String city,
       @Size(max = 255) String region,
       @NotBlank @Size(max = 255) String postalCode,
       @NotBlank @Size(max = 255) String country,
       @NotBlank @Size(max = 255) String phone
) {}
