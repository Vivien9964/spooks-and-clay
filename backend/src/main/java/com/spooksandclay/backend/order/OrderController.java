package com.spooksandclay.backend.order;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }


    @GetMapping("/api/orders")
    public ResponseEntity<List<OrderDto>> getOrders(@RequestParam(required = false) Long userId) {
        return ResponseEntity.ok(orderService.getAllOrders(userId));
    }

    @GetMapping("/api/orders/{id}")
    public ResponseEntity<OrderDto> getOrderById(@PathVariable Long id) {
        return orderService.getOrderById(id)
                .map(orderDto -> ResponseEntity.ok(orderDto))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/api/orders")
    public ResponseEntity<OrderDto> createOrder(@Valid @RequestBody CreateOrderRequest request) {
        OrderDto created = orderService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
}
