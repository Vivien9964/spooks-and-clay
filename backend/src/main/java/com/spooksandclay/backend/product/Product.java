package com.spooksandclay.backend.product;


import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import static jakarta.persistence.GenerationType.IDENTITY;

@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    private String name;
    @Column(unique = true)
    private String slug;
    @Column(length = 500)
    private String shortDesc;
    @Column(length = 4000)
    private String longDesc;
    @Column(precision = 10, scale = 2)
    private BigDecimal price;
    private boolean onSale;
    private boolean active = true;
    private Integer discountPercent;
    private Integer stockCount;
    @CreationTimestamp
    private Instant createdAt;
    private String category;
    private boolean portfolioFeatured = false;
    @ElementCollection
    @CollectionTable(name= "product_images", joinColumns = @JoinColumn(name = "product_id"))
    @OrderColumn(name = "image_order")
    private List<ProductImage> images = new ArrayList<>();

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

    public boolean isActive() { return active; }

    public Integer getDiscountPercent() {
        return discountPercent;
    }

    public Integer getStockCount() {
        return stockCount;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public boolean isPortfolioFeatured() { return portfolioFeatured; }

    public void setId(Long id) {
        this.id = id;
    }

    public List<ProductImage> getImages() {
        return images;
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

    public void setActive(boolean active) { this.active = active; }

    public void setDiscountPercent(Integer discountPercent) {
        this.discountPercent = discountPercent;
    }

    public void setStockCount(Integer stockCount) {
        this.stockCount = stockCount;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setPortfolioFeatured(boolean portfolioFeatured) { this.portfolioFeatured = portfolioFeatured; }

    public String getCategory() {
        return category;
    }

    public void setImages(List<ProductImage> images) {
        this.images = images;
    }

    public void addImage(ProductImage image) {
        if(image == null) {
            return;
        }

        images.add(image);
    }



}
