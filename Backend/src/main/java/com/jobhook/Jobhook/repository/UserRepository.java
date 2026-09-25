package com.jobhook.Jobhook.repository;

import com.jobhook.Jobhook.entity.UserEntity;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<UserEntity, Long> {
    public Optional<UserEntity> findByEmail(String email);
}
