package com.jobhook.Jobhook.controller;

import com.jobhook.Jobhook.dto.LoginDTO;
import com.jobhook.Jobhook.dto.UserDTO;
import com.jobhook.Jobhook.entity.UserEntity;
import com.jobhook.Jobhook.exceptions.JobPortalException;
import com.jobhook.Jobhook.services.UserService;
import com.jobhook.Jobhook.services.UserServiceImpl;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@Validated
@RequestMapping("/users")
public class Usercontroller {
    private final UserService userService;

    Usercontroller(UserServiceImpl userService){
        this.userService = userService;
    }

    @PostMapping("/registerUser")
    public ResponseEntity<UserDTO> registerUser(@RequestBody @Valid UserDTO user) throws JobPortalException {
        UserDTO savedUser = userService.registerUser(user);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    @PostMapping("loginUser")
    public ResponseEntity<UserDTO> loginUser(@RequestBody @Valid LoginDTO loginDTO) throws JobPortalException {
        UserDTO user = userService.loginUser(loginDTO);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<UserDTO>> findAllUser(){
        List<UserDTO> allUsers = userService.findAllUser();
        return new ResponseEntity<>(allUsers, HttpStatus.OK);
    }



}
