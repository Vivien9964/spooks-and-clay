package com.spooksandclay.backend.product;


import java.util.List;

public record ProductDto(Long id, String name, String slug, String shortDesc, String longDesc, String price, boolean onSale, Integer discountPercent, Integer stockCount, String createdAt, String category,  List<ProductImageDto> images){}

