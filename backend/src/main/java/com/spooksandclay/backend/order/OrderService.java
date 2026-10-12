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

import java.math.BigDecimal;
import java.math.RoundingMode;
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
        order.setRecipientName(request.recipientName());
        order.setStreet(request.street());
        order.setCity(request.city());
        order.setRegion(request.region());
        order.setPostalCode(request.postalCode());
        order.setCountry(request.country());
        order.setPhone(request.phone());

        BigDecimal total = BigDecimal.ZERO;

        for(OrderItemRequest itemRequest : request.items()) {
            Product product = productRepository.findById(itemRequest.productId())
                    .orElseThrow(() -> new ProductNotFoundException("Product not found!"));

            if(!product.isActive()) {
                throw new ProductNotFoundException("Product not found!");
            }

            int updatedRows = productRepository.decrementStock(itemRequest.productId(), itemRequest.quantity());
            if (updatedRows == 0) {
                throw new InsufficientStockException("Not enough stock for product: " + product.getName());
            }

            BigDecimal unitPrice = effectiveUnitPrice(product);

            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(product);
            orderItem.setQuantity(itemRequest.quantity());
            orderItem.setUnitPrice(unitPrice);

            order.getItems().add(orderItem);
            total = total.add(unitPrice.multiply(BigDecimal.valueOf(itemRequest.quantity())));

        }

        order.setTotalAmount(total);
        order.setCurrency("RON");

        Order savedOrder = orderRepository.save(order);

        return toOrderDto(savedOrder);
    }

    private BigDecimal effectiveUnitPrice(Product product) {
        Integer discount = product.getDiscountPercent();

        if(!product.isOnSale() || discount == null || discount <= 0) {
            return product.getPrice();
        }

        return product.getPrice().multiply(BigDecimal.valueOf(100-discount)).divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP);
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
                order.getTotalAmount().toString(),
                order.getCurrency(),
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
