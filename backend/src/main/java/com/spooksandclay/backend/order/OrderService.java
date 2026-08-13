package com.spooksandclay.backend.order;


import com.spooksandclay.backend.error.OrderNotFoundException;
import com.spooksandclay.backend.error.ProductNotFoundException;
import com.spooksandclay.backend.error.UserNotFoundException;
import com.spooksandclay.backend.product.Product;
import com.spooksandclay.backend.product.ProductRepository;
import com.spooksandclay.backend.user.User;
import com.spooksandclay.backend.user.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public OrderService(OrderRepository orderRepository, UserRepository userRepository, ProductRepository productRepository) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    public OrderDto create(CreateOrderRequest request, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found!"));

        Order order = new Order();
        order.setUser(user);
        order.setStatus("PENDING");

        for(OrderItemRequest itemRequest : request.items()) {
            Product product = productRepository.findById(itemRequest.productId())
                    .orElseThrow(() -> new ProductNotFoundException("Product not found!"));

            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(product);
            orderItem.setQuantity(itemRequest.quantity());

            order.getItems().add(orderItem);

        }

        Order savedOrder = orderRepository.save(order);

        return toOrderDto(savedOrder);
    }


    public OrderDto updateStatus(Long id, UpdateOrderStatusRequest request) {

        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new OrderNotFoundException("Order not found!"));

        order.setStatus(request.status());

        Order savedOrder = orderRepository.save(order);

        return toOrderDto(savedOrder);


    }

    public Optional<OrderDto> getOrderById(Long id) {
        return orderRepository.findById(id).map(order -> toOrderDto(order));
    }

    public List<OrderDto> getAllOrders(Long userId) {
        List<Order> orders = (userId == null)
                ? orderRepository.findAllWithDetails()
                : orderRepository.findByUserIdWithDetails(userId);

        return orders.stream().map(order -> toOrderDto(order)).toList();
    }

    private OrderDto toOrderDto(Order order) {
        List<OrderItemDto> itemDtos = order.getItems()
                .stream()
                .map(item -> toItemDto(item))
                .toList();

        return new OrderDto(
                order.getId(),
                order.getUser().getId(),
                order.getStatus(),
                order.getCreatedAt().toString(),
                itemDtos
        );
    }

    private OrderItemDto toItemDto(OrderItem item) {
        return new OrderItemDto(
                item.getId(),
                item.getProduct().getId(),
                item.getProduct().getName(),
                item.getProduct().getPrice().toString(),
                item.getQuantity()
        );
    }

}
