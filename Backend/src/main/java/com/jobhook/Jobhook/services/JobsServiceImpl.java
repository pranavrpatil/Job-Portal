package com.jobhook.Jobhook.services;

import com.jobhook.Jobhook.dto.JobsDTO;
import com.jobhook.Jobhook.entity.JobsEntity;
import com.jobhook.Jobhook.exceptions.JobPortalException;
import com.jobhook.Jobhook.repository.JobsRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Optional;

@Service
public class JobsServiceImpl implements JobsService {

    private  final JobsRepository jobsRepository;

    JobsServiceImpl(JobsRepository jobsRepository){
        this.jobsRepository = jobsRepository;
    }
    @Override
    public JobsDTO postNewJob(JobsDTO jobsDTO) throws JobPortalException {
        Optional<JobsEntity> existingJob = jobsRepository.findById(jobsDTO.getId());

        System.out.println("Call reach in service");
        if(existingJob.isPresent()){
            throw new JobPortalException("EXISTED_JOB");
        }
        jobsDTO.setApplicantsList(new ArrayList<>());
        jobsDTO.setPostedTime(LocalDateTime.now());
        JobsEntity savedJob = jobsRepository.save(jobsDTO.toJobsEntity());
        return savedJob.toJobsDTO();
    }
}
