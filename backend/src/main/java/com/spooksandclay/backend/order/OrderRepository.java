package com.spooksandclay.backend.order;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface OrderRepository extends JpaRepository<Order, Long> {

    @Query("SELECT DISTINCT o FROM Order o " +
            "JOIN FETCH o.user " +
            "LEFT JOIN FETCH o.items i " +
            "LEFT JOIN FETCH i.product " +
            "WHERE (:userId IS NULL OR o.user.id = :userId) " +
            "AND (:status IS NULL OR o.status = :status)")
    Page<Order> findAllFiltered(@Param("userId") Long userId, @Param("status") String status, Pageable pageable);
}
