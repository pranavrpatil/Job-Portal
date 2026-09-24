package com.jobhook.Jobhook.services;

import org.springframework.stereotype.Service;

@Service
public class HealthCheckService {

    public String healthCheck(){
        return "I am healthy";
    }
}
