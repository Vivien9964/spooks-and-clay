package com.spooksandclay.backend.order;

import com.spooksandclay.backend.product.Product;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import static org.assertj.core.api.Assertions.assertThat;

public class EffectiveUnitPriceTest {

    private Product product (String price, boolean onSale, Integer discount) {
        Product p = new Product();
        p.setPrice(new BigDecimal(price));
        p.setOnSale(onSale);
        p.setDiscountPercent(discount);
        return p;
    }


    @Test
    void returnsFullPriceWhenNotOnSale() {
        Product p = product("79.99", false, 15);
        BigDecimal result = OrderService.effectiveUnitPrice(p);
        assertThat(result).isEqualByComparingTo("79.99");
    }

    @Test
    void returnsFullPriceWhenDiscountIsNull() {
        Product p = product("79.99", true, null);
        BigDecimal result = OrderService.effectiveUnitPrice(p);
        assertThat(result).isEqualByComparingTo("79.99");
    }

    @Test
    void returnsFullPriceWhenDiscountIsZero() {
        Product p = product("79.99", true, 0);
        BigDecimal result = OrderService.effectiveUnitPrice(p);
        assertThat(result).isEqualByComparingTo("79.99");
    }

    @Test
    void appliesDiscount() {
        Product p = product("79.99", true, 15);
        BigDecimal result = OrderService.effectiveUnitPrice(p);
        assertThat(result).isEqualByComparingTo("67.99");
    }

    @Test
    void roundsHalfUpOnTies() {
        Product p = product("4.10", true, 15);
        BigDecimal result = OrderService.effectiveUnitPrice(p);
        assertThat(result).isEqualByComparingTo("3.49");
    }
}
