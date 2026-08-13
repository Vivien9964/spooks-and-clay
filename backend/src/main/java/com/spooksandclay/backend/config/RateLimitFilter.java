package com.spooksandclay.backend.config;


import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.Refill;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.Duration;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class RateLimitFilter extends OncePerRequestFilter {

    private final ConcurrentHashMap<String, Bucket> buckets = new ConcurrentHashMap<>();
    private final ObjectMapper objectMapper = new ObjectMapper();
    private static final Logger log = LoggerFactory.getLogger(RateLimitFilter.class);

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
      String path = request.getRequestURI();
      boolean isLogin = path.equals("/api/auth/login");
      boolean isRegister = path.equals("/api/auth/register");

      if(!isLogin && !isRegister) {
          filterChain.doFilter(request, response);
          return;
      }

      CachedBodyRequestWrapper wrappedRequest = new CachedBodyRequestWrapper(request);

      String ip = request.getRemoteAddr();
      Bucket ipBucket = resolveBucket("ip:" + ip);

      if(!ipBucket.tryConsume(1)) {
          respondTooManyRequests(response, "ip:" + ip);
          return;
      }

      if(isLogin) {
          String email = extractEmail(wrappedRequest);

          if(email != null) {
              Bucket emailBucket = resolveBucket("email:" + email.toLowerCase());

              if(!emailBucket.tryConsume(1)) {
                  respondTooManyRequests(response, "email:" + email.toLowerCase());
                  return;
              }
          }
      }

      filterChain.doFilter(wrappedRequest, response);

    }

    private String extractEmail(CachedBodyRequestWrapper wrappedRequest) {
        try {
            JsonNode json = objectMapper.readTree(wrappedRequest.getCachedBody());
            JsonNode emailNode = json.get("email");
            return emailNode == null ? null : emailNode.asText();
        } catch (IOException e) {
            return null;
        }
    }

    private Bucket resolveBucket(String key) {
        return buckets.computeIfAbsent(key, k -> Bucket.builder()
                .addLimit(Bandwidth.classic(5, Refill.greedy(5, Duration.ofMinutes(1))))
                .build());
    }


    private void respondTooManyRequests(HttpServletResponse response, String key) throws IOException {
        log.warn("Rate limit exceeded for key={}", key);
        response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
        response.setContentType("application/json");
        response.getWriter().write("{\"status\":429,\"message\":\"Too many requests. Please try again later.\",\"fieldErrors\":null}");
    }

}
