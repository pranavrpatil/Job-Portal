package com.jobhook.Jobhook.services;

import com.jobhook.Jobhook.dto.UserDTO;
import com.jobhook.Jobhook.entity.UserEntity;
import com.jobhook.Jobhook.exceptions.JobPortalException;
import com.jobhook.Jobhook.repository.UserRepository;
import com.jobhook.Jobhook.utility.Utilities;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service(value = "userService")
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder
    ){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<UserDTO> findAllUser() {
        List<UserEntity> users = userRepository.findAll();
        return null;
    }

    @Override
    public UserDTO registerUser(UserDTO userDTO) throws JobPortalException {
        Optional<UserEntity> existingUser = userRepository.findByEmail(userDTO.getEmail());
        if(existingUser.isPresent()){
            throw new JobPortalException("USER_FOUND");
        }
        userDTO.setId(Utilities.getNextSequence("user"));
        userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        UserEntity user = userDTO.toEntity();
        UserEntity savedUser = userRepository.save(user);
        return savedUser.toDTO();
    }
}
