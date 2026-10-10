package com.jobhook.Jobhook.entity;

import com.jobhook.Jobhook.dto.CertificationDTO;
import com.jobhook.Jobhook.dto.ExperienceDTO;
import com.jobhook.Jobhook.dto.ProfileDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "profiles")
public class ProfileEntity {
    @Id
    private Long id;
    private String email;
    private String jobTitle;
    private String company;
    private String location;
    private String about;
    private List<String> skills;
    private List<ExperienceDTO> experiences;
    private List<CertificationDTO> certifications;

    public ProfileDTO toProfileDTO(){
        return new ProfileDTO(this.id, this.email, this.jobTitle,this.company, this.location, this.about, this.skills, this.experiences, this.certifications);
    }
}
