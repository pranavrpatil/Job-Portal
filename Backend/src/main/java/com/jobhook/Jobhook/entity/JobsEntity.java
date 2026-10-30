package com.jobhook.Jobhook.entity;

import com.jobhook.Jobhook.dto.Applicant;
import com.jobhook.Jobhook.dto.JobStatus;
import com.jobhook.Jobhook.dto.JobsDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "jobs")
public class JobsEntity {

    @Id
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

    public JobsDTO toJobsDTO(){
        return new JobsDTO(this.id, this.jobTitle, this.company, this.applicantsList, this.about, this.experience, this.location, this.offeredPackage, this.postedTime, this.description, this.requiredSkills, this.jobStatus);
    }
}
