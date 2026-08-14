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

    @Modifying
    @Query("UPDATE Product p SET p.stockCount = p.stockCount - :qty WHERE p.id = :id AND p.stockCount >= :qty")
    int decrementStock(@Param("id") Long id, @Param("qty") Integer qty);
}
