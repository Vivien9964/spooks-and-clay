package com.spooksandclay.backend.product;

import com.spooksandclay.backend.error.ProductNotFoundException;
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
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductService productService;

    private CreateProductRequest request(String slug, boolean active) {
        return new CreateProductRequest(
                "Renamed spook", slug, "Short", "Long",
                new BigDecimal("79.99"), false, null, 1, "autumnScenes",
                List.of(new ProductImageDto("https://res.cloudinary.com/demo/image/upload/a.jpg", "A tiny ghost")),
                false, active,
                new BigDecimal("9.0"), new BigDecimal("5.5"), 60,
                List.of("clay")
        );
    }

    private Product existing(String slug, boolean active) {
        Product product = new Product();
        product.setId(1L);
        product.setSlug(slug);
        product.setActive(active);
        product.setCreatedAt(Instant.now());
        return product;
    }

    @Test
    void updateKeepsTheOriginalSlug() {
        when(productRepository.findById(1L)).thenReturn(Optional.of(existing("original-slug", true)));
        when(productRepository.save(any(Product.class))).thenAnswer(invocation -> invocation.getArgument(0));

        ProductDto result = productService.update(1L, request("new-slug", true));

        assertThat(result.slug()).isEqualTo("original-slug");
        assertThat(result.name()).isEqualTo("Renamed spook");
    }

    @Test
    void updateCanRestoreAHiddenProduct() {
        when(productRepository.findById(1L)).thenReturn(Optional.of(existing("hidden-spook", false)));
        when(productRepository.save(any(Product.class))).thenAnswer(invocation -> invocation.getArgument(0));

        ProductDto result = productService.update(1L, request("hidden-spook", true));

        assertThat(result.active()).isTrue();
    }

    @Test
    void updateThrowsAndDoesNotSaveWhenProductNotFound() {
        when(productRepository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> productService.update(99L, request("any-slug", true)))
                .isInstanceOf(ProductNotFoundException.class);

        verify(productRepository, never()).save(any());
    }
}