package com.spooksandclay.backend.product;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {

        this.productService = productService;
    }

    @GetMapping("/api/products")
    public ResponseEntity<List<ProductDto>> getProducts() {

        return ResponseEntity.ok(productService.getAll());
    }

    @GetMapping("/api/products/{slug}")
    public ResponseEntity<ProductDto> getProductBySlug(@PathVariable String slug) {
        return productService.getBySlug(slug)
                .map(dto -> ResponseEntity.ok(dto))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/api/products")
    public ResponseEntity<ProductDto> createProduct(@RequestBody CreateProductRequest request) {
        ProductDto created = productService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

}
