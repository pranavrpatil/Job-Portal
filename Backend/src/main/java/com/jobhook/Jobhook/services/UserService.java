package com.jobhook.Jobhook.services;

import com.jobhook.Jobhook.dto.UserDTO;

import java.util.List;

public interface UserService {
    public UserDTO registerUser(UserDTO userDTO);

    public List<UserDTO> findAllUser();
}
