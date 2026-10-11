package com.jobhook.Jobhook.services;

import com.jobhook.Jobhook.dto.ProfileDTO;
import com.jobhook.Jobhook.entity.ProfileEntity;
import com.jobhook.Jobhook.exceptions.JobPortalException;
import com.jobhook.Jobhook.repository.ProfileRepository;
import com.jobhook.Jobhook.utility.Utilities;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class ProfileServiceImpl implements ProfileService{

    private final ProfileRepository profileRepository;

    ProfileServiceImpl(ProfileRepository profileRepository){
        this.profileRepository = profileRepository;
    }
    @Override
    public Long createProfile(String email) throws JobPortalException {
        ProfileEntity profile = new ProfileEntity();
        profile.setId(Utilities.getNextSequence("profiles"));
        profile.setEmail(email);
        profile.setCertifications(new ArrayList<>());
        profile.setSkills(new ArrayList<>());
        profile.setExperiences(new ArrayList<>());
        profileRepository.save(profile);
        return profile.getId();
    }

    @Override
    public ProfileDTO getProfile(Long id) throws JobPortalException {
        ProfileDTO profileDTO = profileRepository.findById(id).orElseThrow(()-> new JobPortalException("PROFILE_NOT_FOUND")).toProfileDTO();
        return profileDTO;
    }

    @Override
    public ProfileDTO updateProfile(ProfileDTO profileDTO) throws JobPortalException {
        ProfileEntity profileEntity = profileRepository.findById(profileDTO.getId()).orElseThrow(()-> new JobPortalException("PROFILE_NOT_FOUND"));
        profileRepository.save(profileDTO.toProfileEntity());
        return profileDTO;
    }
}
