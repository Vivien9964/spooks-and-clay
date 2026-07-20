package com.spooksandclay.backend.product;

public record CreateProductRequest(String name, String slug, String shortDesc, String longDesc, String price, boolean onSale, Integer discountPercent, Integer stockCount, String category) {}
