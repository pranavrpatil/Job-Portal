package com.jobhook.Jobhook.services;

import com.jobhook.Jobhook.dto.UserDTO;
import com.jobhook.Jobhook.exceptions.JobPortalException;

import java.util.List;

public interface UserService {
    public UserDTO registerUser(UserDTO userDTO) throws JobPortalException;

    public List<UserDTO> findAllUser();
}
