package com.spooksandclay.backend.order;

import com.spooksandclay.backend.error.InsufficientStockException;
import com.spooksandclay.backend.error.ProductNotFoundException;
import com.spooksandclay.backend.product.Product;
import com.spooksandclay.backend.product.ProductRepository;
import com.spooksandclay.backend.user.User;
import com.spooksandclay.backend.user.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class OrderServiceTest {

    @Mock
    private OrderRepository orderRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private ProductRepository productRepository;

    private User user;

    @InjectMocks
    private OrderService orderService;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setId(1L);
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
    }

    private Product product(Long id, String price, boolean onSale, Integer discount) {
        Product p = new Product();
        p.setId(id);
        p.setName("Spook " + id);
        p.setPrice(new BigDecimal(price));
        p.setOnSale(onSale);
        p.setDiscountPercent(discount);
        p.setActive(true);
        p.setStockCount(5);
        return p;
    }

    private CreateOrderRequest request(OrderItemRequest... items) {
        return new CreateOrderRequest(
                List.of(items),
                "Bingu", "Street 1", "Arad", null, "310130", "Romania", "0777777777"
        );
    }

    @Test
    void totalIsSumOfDiscountedLines() {
        Product discounted = product(10L, "79.99", true, 15);
        Product regular = product(20L, "50.00", false, null);
        when(productRepository.findById(10L)).thenReturn(Optional.of(discounted));
        when(productRepository.findById(20L)).thenReturn(Optional.of(regular));
        when(productRepository.decrementStock(anyLong(), anyInt())).thenReturn(1);
        when(orderRepository.save(any(Order.class))).thenAnswer(invocation -> {
            Order o = invocation.getArgument(0);
            o.setCreatedAt(Instant.now());
            return o;
        });

        OrderDto dto = orderService.create(
                request(new OrderItemRequest(10L, 1), new OrderItemRequest(20L, 2)), 1L);
        assertThat(dto.total()).isEqualTo("167.99");
        assertThat(dto.currency()).isEqualTo("RON");
        assertThat(dto.status()).isEqualTo(OrderStatus.PENDING);
        assertThat(dto.items()).extracting(OrderItemDto::price).containsExactly("67.99", "50.00");
    }

    @Test
    void throwsAndDoesNotSaveWhenStockRunsOut() {
        Product p = product(10L, "79.99", false, null);
        when(productRepository.findById(10L)).thenReturn(Optional.of(p));
        when(productRepository.decrementStock(10L, 1)).thenReturn(0);

        assertThatThrownBy(() -> orderService.create(request(new OrderItemRequest(10L,1)), 1L)).isInstanceOf(InsufficientStockException.class);
        verify(orderRepository, never()).save(any());
    }

    @Test
    void throwsAndDoesNotTouchStockWhenProductIsNotActive() {
        Product p = product(10L, "79.99", false, null);
        p.setActive(false);
        when(productRepository.findById(10L)).thenReturn(Optional.of(p));

        assertThatThrownBy(() -> orderService.create(request(new OrderItemRequest(10L, 1)), 1L)).isInstanceOf(ProductNotFoundException.class);
        verify(productRepository, never()).decrementStock(anyLong(), anyInt());
        verify(orderRepository, never()).save(any());
    }


}
