
package com.spooksandclay.backend.order;

import com.spooksandclay.backend.user.User;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import static jakarta.persistence.GenerationType.IDENTITY;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = true)
    private User user;
    private String recipientName;
    private String street;
    private String city;
    private String region;
    private String postalCode;
    private String country;
    private String phone;
    private String guestEmail;

    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    @CreationTimestamp
    private Instant createdAt;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderItem> items = new ArrayList<>();

    public Order() {}

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }
    public String getRecipientName() { return recipientName; }

    public String getStreet() { return street; }

    public String getCity() { return city; }

    public String getRegion() { return region; }

    public String getPostalCode() { return postalCode; }

    public String getCountry() { return country; }

    public String getPhone() { return phone; }

    public String getGuestEmail() { return guestEmail; }

    public OrderStatus getStatus() {
        return status;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public List<OrderItem> getItems() {
        return items;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setRecipientName(String recipientName) { this.recipientName = recipientName; }

    public void setStreet(String street) { this.street = street; }

    public void setCity(String city) { this.city = city; }

    public void setRegion(String region) { this.region = region; }

    public void setPostalCode(String postalCode) { this.postalCode = postalCode; }

    public void setCountry(String country) { this.country = country; }

    public void setPhone(String phone) { this.phone = phone; }

    public void setGuestEmail(String guestEmail) { this.guestEmail = guestEmail; }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public void setItems(List<OrderItem> items) {
        this.items = items;
    }
}
