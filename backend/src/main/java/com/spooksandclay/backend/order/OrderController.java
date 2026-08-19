package com.spooksandclay.backend.order;

import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }


    @GetMapping("/api/orders")
    public ResponseEntity<Page<OrderDto>> getOrders(@RequestParam(required = false) Long userId, Pageable pageable, @RequestParam(required = false) String status, Authentication authentication) {

        Long callerId = Long.parseLong(authentication.getName());
        boolean isAdmin = authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));

        Long effectiveUserId = isAdmin ? userId : callerId;

        return ResponseEntity.ok(orderService.getAllOrders(pageable, effectiveUserId, status));
    }

    @GetMapping("/api/orders/{id}")
    public ResponseEntity<OrderDto> getOrderById(@PathVariable Long id, Authentication authentication) {

        Long callerId = Long.parseLong(authentication.getName());
        boolean isAdmin = authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));


        return orderService.getOrderById(id)
                .filter(order -> isAdmin || order.userId().equals(callerId))
                .map(orderDto -> ResponseEntity.ok(orderDto))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/api/orders")
    public ResponseEntity<OrderDto> createOrder(@Valid @RequestBody CreateOrderRequest request, Authentication authentication) {
        Long callerId = Long.parseLong(authentication.getName());
        OrderDto created = orderService.create(request, callerId);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("/api/orders/{id}/status")
    public ResponseEntity<OrderDto> updateOrderStatus(@PathVariable Long id, @Valid @RequestBody UpdateOrderStatusRequest request) {
        return ResponseEntity.ok(orderService.updateStatus(id, request));
    }

}
