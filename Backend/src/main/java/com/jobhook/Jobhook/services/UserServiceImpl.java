package com.jobhook.Jobhook.services;

import com.jobhook.Jobhook.dto.UserDTO;
import com.jobhook.Jobhook.entity.UserEntity;
import com.jobhook.Jobhook.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service(value = "userService")
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    UserServiceImpl(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    public List<UserDTO> findAllUser() {
        List<UserEntity> users = userRepository.findAll();
        return null;
    }
//
//    public UserEntity createUser(UserEntity user){
//        return userRepository.save(user);
//    }


    @Override
    public UserDTO registerUser(UserDTO userDTO) {
        UserEntity user = userDTO.toEntity();
        UserEntity savedUser = userRepository.save(user);
        return savedUser.toDTO();
    }
}
