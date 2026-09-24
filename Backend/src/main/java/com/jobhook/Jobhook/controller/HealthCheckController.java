package com.jobhook.Jobhook.controller;

import com.jobhook.Jobhook.services.HealthCheckService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/health")
public class HealthCheckController {

    private final HealthCheckService healthCheckService;

    HealthCheckController(HealthCheckService healthCheckService){
        this.healthCheckService = healthCheckService;
    }

    @GetMapping
    public String healthCheck(){
        return healthCheckService.healthCheck();
    }
}
