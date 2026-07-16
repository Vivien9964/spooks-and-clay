package com.spooksandclay.backend.product;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.math.BigDecimal;

import static jakarta.persistence.GenerationType.IDENTITY;

@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    private String name;
    private String slug;
    private String shortDesc;
    private String longDesc;
    private BigDecimal price;
    private boolean onSale;
    private Integer discountPercent;
    private Integer stockCount;
    private String createdAt;
    private String category;

    public Product() {}

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getSlug() {
        return slug;
    }

    public String getShortDesc() {
        return shortDesc;
    }

    public String getLongDesc() {
        return longDesc;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public boolean isOnSale() {
        return onSale;
    }

    public Integer getDiscountPercent() {
        return discountPercent;
    }

    public Integer getStockCount() {
        return stockCount;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public void setName(String name) {
        this.name = name;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public void setShortDesc(String shortDesc) {
        this.shortDesc = shortDesc;
    }

    public void setLongDesc(String longDesc) {
        this.longDesc = longDesc;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public void setOnSale(boolean onSale) {
        this.onSale = onSale;
    }

    public void setDiscountPercent(Integer discountPercent) {
        this.discountPercent = discountPercent;
    }

    public void setStockCount(Integer stockCount) {
        this.stockCount = stockCount;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getCategory() {
        return category;
    }






}
