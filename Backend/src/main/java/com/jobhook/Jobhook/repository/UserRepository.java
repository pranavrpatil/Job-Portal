package com.jobhook.Jobhook.repository;

import com.jobhook.Jobhook.entity.UserEntity;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<UserEntity, String> {
}
