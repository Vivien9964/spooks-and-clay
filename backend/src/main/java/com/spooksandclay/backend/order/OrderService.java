package com.spooksandclay.backend.order;


import com.spooksandclay.backend.error.InsufficientStockException;
import com.spooksandclay.backend.error.OrderNotFoundException;
import com.spooksandclay.backend.error.ProductNotFoundException;
import com.spooksandclay.backend.error.UserNotFoundException;
import com.spooksandclay.backend.product.Product;
import com.spooksandclay.backend.product.ProductRepository;
import com.spooksandclay.backend.user.User;
import com.spooksandclay.backend.user.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    @Transactional
    public OrderDto create(CreateOrderRequest request, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found!"));

        Order order = new Order();
        order.setUser(user);
        order.setStatus(OrderStatus.PENDING);

        for(OrderItemRequest itemRequest : request.items()) {
            Product product = productRepository.findById(itemRequest.productId())
                    .orElseThrow(() -> new ProductNotFoundException("Product not found!"));

            int updatedRows = productRepository.decrementStock(itemRequest.productId(), itemRequest.quantity());
            if (updatedRows == 0) {
                throw new InsufficientStockException("Not enough stock for product: " + product.getName());
            }
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(product);
            orderItem.setQuantity(itemRequest.quantity());
            orderItem.setUnitPrice(product.getPrice());

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

    public Page<OrderDto> getAllOrders(Pageable pageable, Long userId, OrderStatus status) {

        Page<Order> orderPage = orderRepository.findAllFiltered(userId, status, pageable);

        return orderPage.map(order -> toOrderDto(order));

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
                item.getUnitPrice().toString(),
                item.getQuantity()
        );
    }

}
