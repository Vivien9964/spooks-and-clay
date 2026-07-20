package com.spooksandclay.backend.product;

import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<ProductDto> getAll() {
        return productRepository.findAll()
                .stream()
                .map(product -> toDto(product))
                .toList();
    }

    public Optional<ProductDto> getBySlug(String slug) {
        return productRepository.findBySlug(slug).map(product -> toDto(product));
    }

    private ProductDto toDto(Product product) {
        return new ProductDto(
                product.getId(),
                product.getName(),
                product.getSlug(),
                product.getShortDesc(),
                product.getLongDesc(),
                product.getPrice().toString(),
                product.isOnSale(),
                product.getDiscountPercent(),
                product.getStockCount(),
                product.getCreatedAt().toString(),
                product.getCategory()
        );
    }

    public ProductDto create(CreateProductRequest request) {
        Product product = new Product();
        product.setName(request.name());
        product.setSlug(request.slug());
        product.setShortDesc(request.shortDesc());
        product.setLongDesc(request.longDesc());
        product.setPrice(new BigDecimal(request.price()));
        product.setOnSale(request.onSale());
        product.setDiscountPercent(request.discountPercent());
        product.setStockCount(request.stockCount());
        product.setCategory(request.category());

        Product savedProduct = productRepository.save(product);
        return toDto(savedProduct);
    }
}
