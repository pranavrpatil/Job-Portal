package com.jobhook.Jobhook.dto;

import com.jobhook.Jobhook.entity.ProfileEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProfileDTO {
    private Long id;
    private String email;
    private String role;
    private String company;
    private String location;
    private String about;
    private List<String> skills;
    private List<ExperienceDTO> experiences;
    private List<CertificationDTO> certifications;

    public ProfileEntity toProfileEntity(){
        return new ProfileEntity(this.id, this.email, this.role,this.company, this.location, this.about, this.skills, this.experiences, this.certifications);
    }
}
