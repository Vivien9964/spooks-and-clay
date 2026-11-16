package com.spooksandclay.backend.product;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.context.ActiveProfiles;

import java.math.BigDecimal;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@ActiveProfiles("test")
public class ProductRepositoryTest {

    @Autowired
    private ProductRepository repo;

    private Product product(String slug, boolean active, int stock, boolean featured) {
        Product p = new Product();
        p.setName(slug);
        p.setSlug(slug);
        p.setPrice(new BigDecimal("50.00"));
        p.setCategory("autumn");
        p.setActive(active);
        p.setStockCount(stock);
        p.setFeatured(featured);
        return p;
    }

    @BeforeEach
    void setUp() {
        repo.save(product("available", true, 1, false));
        repo.save(product("sold", true, 0, false));
        repo.save(product("deleted", false, 1, false));
        repo.save(product("featured-available", true, 1, true));
        repo.save(product("featured-sold", true, 0, true));
    }


    @Test
    void findAvailableHideSoldAndInactive() {
        List<String> slugs = repo.findAvailable(PageRequest.of(0,20))
                .map(Product::getSlug)
                .getContent();
        assertThat(slugs).containsExactlyInAnyOrder("available", "featured-available");
    }

    @Test
    void findFeaturedOnlyReturnsAvailableFeatured() {
        List<String> slugs = repo.findFeatured(PageRequest.of(0,20))
                .map(Product::getSlug)
                .getContent();
        assertThat(slugs).containsExactly("featured-available");
    }

    @Test
    void findBySlugStillFindsSoldPieces() {
        assertThat(repo.findBySlug("sold")).isPresent();
    }

}
