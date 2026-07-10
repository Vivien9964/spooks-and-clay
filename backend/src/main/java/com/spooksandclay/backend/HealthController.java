package com.spooksandclay.backend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {

    @GetMapping("/api/health")
    public HealthStatus checkHealth() {
        return new HealthStatus("UP");
    }
}
