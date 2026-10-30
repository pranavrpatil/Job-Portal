package com.jobhook.Jobhook.repository;

import com.jobhook.Jobhook.entity.JobsEntity;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface JobsRepository extends MongoRepository<JobsEntity, Long> {
}
