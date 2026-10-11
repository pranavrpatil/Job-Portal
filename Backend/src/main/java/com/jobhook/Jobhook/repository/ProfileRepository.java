package com.jobhook.Jobhook.repository;

import com.jobhook.Jobhook.entity.ProfileEntity;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProfileRepository extends MongoRepository<ProfileEntity, Long> {
}
