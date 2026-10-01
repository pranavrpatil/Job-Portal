package com.jobhook.Jobhook.repository;

import com.jobhook.Jobhook.entity.OTP;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface OTPRepository extends MongoRepository<OTP, String> {
    public Optional<OTP> findByEmail(String email);
    List<OTP> findByCreationTimeBefore(LocalDateTime time);
}
