package com.jobhook.Jobhook.services;

import com.jobhook.Jobhook.dto.JobsDTO;
import com.jobhook.Jobhook.exceptions.JobPortalException;

public interface JobsService {

    public JobsDTO postNewJob(JobsDTO jobsDTO) throws JobPortalException;
}
