package com.jobhook.Jobhook.controller;

import com.jobhook.Jobhook.dto.ProfileDTO;
import com.jobhook.Jobhook.exceptions.JobPortalException;
import com.jobhook.Jobhook.services.ProfileServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@Validated
@RequestMapping("/profile")
public class ProfileController {

    private final ProfileServiceImpl profileService;

    ProfileController(ProfileServiceImpl profileService){
        this.profileService =profileService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProfileDTO> getProfile(@PathVariable Long id) throws JobPortalException {
        ProfileDTO profileDTO = profileService.getProfile(id);
        return new ResponseEntity<>(profileDTO, HttpStatus.OK);
    }

    @PutMapping("/updateProfile")
    public ResponseEntity<ProfileDTO> updateProfile(@RequestBody ProfileDTO profileDTO) throws JobPortalException {
        ProfileDTO updatedProfileDTO = profileService.updateProfile(profileDTO);
        return new ResponseEntity<>(updatedProfileDTO, HttpStatus.OK);
    }
}
