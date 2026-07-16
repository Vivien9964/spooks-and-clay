package com.spooksandclay.backend.product;

public record ProductDto(Long id, String name, String slug, String shortDesc, String longDesc, String price, boolean onSale, Integer discountPercent, Integer stockCount, String createdAt, String category) {}

