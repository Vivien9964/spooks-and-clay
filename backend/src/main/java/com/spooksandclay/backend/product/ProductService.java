package com.spooksandclay.backend.product;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private List<ProductDto> products = List.of(
            new ProductDto(1, "Spooky Candle", "spooky-candle"),
            new ProductDto(2, "Witch hat", "witch-hat"),
            new ProductDto(3, "Pumpkin Spice pillow sheet", "pimpkin-pillow-sheet")
    );

    public List<ProductDto> getAll() {

        return products;
    }
}
