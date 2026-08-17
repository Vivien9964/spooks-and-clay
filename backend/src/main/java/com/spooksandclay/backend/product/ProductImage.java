package com.spooksandclay.backend.product;

import jakarta.persistence.Embeddable;

@Embeddable
public class ProductImage {

    private String src;
    private String alt;

    public ProductImage() {}

    public String getSrc() {
        return src;
    }

    public String getAlt() {
        return alt;
    }

    public void setSrc(String src) {
        this.src = src;
    }

    public void setAlt(String alt) {
        this.alt = alt;
    }
}
