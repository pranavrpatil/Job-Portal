package com.jobhook.Jobhook.dto;

import com.jobhook.Jobhook.entity.JobsEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobsDTO {

    private Long id;
    private String jobTitle;
    private String company;
    private List<Applicant> applicantsList;
    private String about;
    private int experience;
    private String location;
    private Long offeredPackage;
    private LocalDateTime postedTime;
    private String description;
    private List<String> requiredSkills;
    private JobStatus jobStatus;

    public JobsEntity toJobsEntity(){
        return new JobsEntity(this.id, this.jobTitle, this.company, this.applicantsList, this.about, this.experience, this.location, this.offeredPackage, this.postedTime, this.description, this.requiredSkills, this.jobStatus);
    }
}
