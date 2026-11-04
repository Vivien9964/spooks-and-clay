package com.spooksandclay.backend.product;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {

    Optional<Product> findBySlug(String slug);

    Page<Product> findByCategory(String category, Pageable pageable);

    @Query("SELECT p FROM Product p WHERE p.active = true AND p.stockCount > 0")
    Page<Product> findAvailable(Pageable pageable);

    @Query("SELECT p FROM Product p WHERE p.active = true AND p.stockCount > 0 AND p.category = :category")
    Page<Product> findAvailableByCategory(@Param("category") String category, Pageable pageable);

    @Query("SELECT p FROM Product p WHERE p.active = true AND p.stockCount > 0 AND p.featured = true")
    Page<Product> findFeatured(Pageable pageable);

    @Modifying
    @Query("UPDATE Product p SET p.stockCount = p.stockCount - :qty WHERE p.id = :id AND p.stockCount >= :qty")
    int decrementStock(@Param("id") Long id, @Param("qty") Integer qty);
}
