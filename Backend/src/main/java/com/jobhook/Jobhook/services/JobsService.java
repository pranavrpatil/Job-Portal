package com.jobhook.Jobhook.services;

import com.jobhook.Jobhook.dto.JobsDTO;
import com.jobhook.Jobhook.exceptions.JobPortalException;

import java.util.List;

public interface JobsService {

    public JobsDTO postNewJob(JobsDTO jobsDTO) throws JobPortalException;
    public List<JobsDTO> getAllJobs();

    public JobsDTO getJobById(String id) throws JobPortalException;
}
