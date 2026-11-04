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
    private boolean featured = false;

    @Column(precision = 4, scale =1)
    private BigDecimal heightCm;

    @Column(precision = 4, scale = 1)
    private BigDecimal widthCm;

    @Column(name = "weight_g")
    private Integer weightG;

    @ElementCollection
    @CollectionTable(name = "product_materials", joinColumns = @JoinColumn(name = "product_id"))
    @OrderColumn(name = "material_order")
    @Column(name = "material", length = 100, nullable = false)
    private List<String> materials = new ArrayList<>();

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

    public boolean isFeatured() { return featured; }

    public BigDecimal getHeightCm() { return heightCm; }

    public BigDecimal getWidthCm() { return widthCm; }

    public Integer getWeightG() { return weightG; }

    public List<String> getMaterials() { return materials; }

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

    public void setFeatured(boolean featured) { this.featured = featured; }

    public void setHeightCm(BigDecimal heightCm) { this.heightCm = heightCm; }

    public void setWidthCm(BigDecimal widthCm ) { this.widthCm = widthCm; }

    public void setWeightG(Integer weightG ) { this.weightG = weightG; }

    public void setMaterials(List<String> materials) {
        this.materials.clear();
        if(materials != null) {
            this.materials.addAll(materials);
        }
    }

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
