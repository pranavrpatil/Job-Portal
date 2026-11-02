package com.jobhook.Jobhook.controller;

import com.jobhook.Jobhook.dto.JobsDTO;
import com.jobhook.Jobhook.exceptions.JobPortalException;
import com.jobhook.Jobhook.services.JobsServiceImpl;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Validated
@CrossOrigin
@RequestMapping("/jobs")
public class JobsController {

    private final JobsServiceImpl jobsService;

    JobsController(JobsServiceImpl jobsService){
        this.jobsService = jobsService;
    }

    @PostMapping("/postJob")
    public ResponseEntity<JobsDTO> postNewJob(@RequestBody @Valid JobsDTO jobsDTO) throws JobPortalException {
        JobsDTO savedJob = jobsService.postNewJob(jobsDTO);
        return new ResponseEntity<>(savedJob, HttpStatus.CREATED);
    }

    @GetMapping("/getAllJobs")
    public ResponseEntity<List<JobsDTO>> getAllJobs(){
        List<JobsDTO> allJobs = jobsService.getAllJobs();
        return new ResponseEntity<>(allJobs, HttpStatus.OK);
    }

    @GetMapping("/getJobById/{id}")
    public ResponseEntity<JobsDTO> getJobById(@PathVariable String id) throws JobPortalException {
        JobsDTO job = jobsService.getJobById(id);
        return new ResponseEntity<>(job, HttpStatus.OK);
    }
}
