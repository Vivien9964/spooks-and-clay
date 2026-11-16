package com.spooksandclay.backend.config;

import com.spooksandclay.backend.user.Role;
import com.spooksandclay.backend.user.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

import static org.assertj.core.api.Assertions.assertThat;

class JwtServiceTest {

    static final String SECRET = "test-only-secret-not-used-anywhere-real-1234567890";

    private JwtService jwtService;

    static JwtService createJwtService() {
        JwtService service = new JwtService();
        ReflectionTestUtils.setField(service, "secret", SECRET);
        ReflectionTestUtils.setField(service, "expirationMs", 3600000L);
        return service;
    }

    @BeforeEach
    void setUp() {
        jwtService = createJwtService();
    }

    @Test
    void tokenItIssuedIsValid() {
        User user = new User();
        user.setId(1L);
        user.setRole(Role.CUSTOMER);

        String token = jwtService.generateToken(user);

        assertThat(jwtService.isTokenValid(token)).isTrue();
    }

    @Test
    void garbageTokenIsInvalid() {
        assertThat(jwtService.isTokenValid("not-a-jwt")).isFalse();
    }

    @Test
    void emptyTokenIsInvalid() {
        assertThat(jwtService.isTokenValid("")).isFalse();
    }

    @Test
    void tokenSignedWithAnotherKeyIsInvalid() {
        String forged = Jwts.builder()
                .subject("1")
                .claim("role", "ADMIN")
                .signWith(Keys.hmacShaKeyFor("some-attacker-secret-that-is-long-enough-123".getBytes()))
                .compact();

        assertThat(jwtService.isTokenValid(forged)).isFalse();
    }
}