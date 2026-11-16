package com.spooksandclay.backend.config;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockFilterChain;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import static org.assertj.core.api.Assertions.assertThat;

public class JwtAuthFilterTest {

    private JwtAuthFilter filter;

    @BeforeEach
    void setUp() {
        filter = new JwtAuthFilter((JwtServiceTest.createJwtService()));
        SecurityContextHolder.clearContext();
    }

    @AfterEach
    void tearDown() {
        SecurityContextHolder.clearContext();
    }

    private Authentication runFilterWith(String authorizationHeader) throws Exception {
        MockHttpServletRequest request = new MockHttpServletRequest();
        request.addHeader("Authorization", authorizationHeader);

        filter.doFilter(request, new MockHttpServletResponse(), new MockFilterChain());

        return SecurityContextHolder.getContext().getAuthentication();
    }

    private String signedToken(String role) {
        var builder = Jwts.builder().subject("1");
        if(role != null) {
            builder.claim("role", role);
        }
        return builder
                .signWith((Keys.hmacShaKeyFor(JwtServiceTest.SECRET.getBytes())))
                .compact();
    }


    @Test
    void validTokenAuthenticatesWithRole() throws Exception {
        Authentication auth = runFilterWith("Bearer " + signedToken("CUSTOMER"));

        assertThat(auth).isNotNull();
        assertThat(auth.getName()).isEqualTo("1");
        assertThat(auth.getAuthorities())
                .extracting(a -> a.getAuthority())
                .containsExactly("ROLE_CUSTOMER");
    }

    @Test
    void tokenWithoutRoleIsNotAuthenticated() throws Exception {
        Authentication auth = runFilterWith("Bearer " + signedToken(null));
        assertThat(auth).isNull();
    }

    @Test
    void emptyBearerIsNotAuthenticated() throws Exception {
        Authentication auth = runFilterWith("Bearer ");
        assertThat(auth).isNull();
    }


}
