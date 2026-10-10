package com.jobhook.Jobhook.services;

import com.jobhook.Jobhook.dto.ProfileDTO;
import com.jobhook.Jobhook.exceptions.JobPortalException;

public interface ProfileService {
    public Long createProfile(String email) throws JobPortalException;
    public ProfileDTO getProfile(Long id) throws JobPortalException;
    public ProfileDTO updateProfile(ProfileDTO profileDTO) throws JobPortalException;
}
