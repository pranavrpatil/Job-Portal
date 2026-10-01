package com.jobhook.Jobhook.repository;

import com.jobhook.Jobhook.entity.OTP;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface OTPRepository extends MongoRepository<OTP, String> {
    public Optional<OTP> findByEmail(String email);
}
