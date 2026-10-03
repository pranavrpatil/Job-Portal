package com.jobhook.Jobhook.services;

import com.jobhook.Jobhook.dto.ChangePasswordDTO;
import com.jobhook.Jobhook.dto.LoginDTO;
import com.jobhook.Jobhook.dto.ResponseDTO;
import com.jobhook.Jobhook.dto.UserDTO;
import com.jobhook.Jobhook.exceptions.JobPortalException;
import jakarta.validation.Valid;

import java.util.List;

public interface UserService {
    public UserDTO registerUser(UserDTO userDTO) throws JobPortalException;
    public UserDTO loginUser(LoginDTO loginDTO) throws JobPortalException;
    public boolean sendOtp(String email) throws Exception;
    public boolean verifyOtp(String email, String otp) throws JobPortalException;
    public ResponseDTO resetPassword(LoginDTO loginDTO) throws JobPortalException;
    public ResponseDTO changePassword(ChangePasswordDTO loginDTO) throws JobPortalException;
}
