package com.jobhook.Jobhook.controller;

import com.jobhook.Jobhook.dto.UserDTO;
import com.jobhook.Jobhook.entity.UserEntity;
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
    public ResponseEntity<UserDTO> registerUser(@RequestBody @Valid UserDTO user){
        UserDTO savedUser = userService.registerUser(user);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<UserDTO>> findAllUser(){
        List<UserDTO> allUsers = userService.findAllUser();
        return new ResponseEntity<>(allUsers, HttpStatus.OK);
    }
//
//    @PostMapping("/createUser")
//    public ResponseEntity<UserEntity> addNewUser(@RequestBody UserEntity user){
//        UserEntity savedUser = userService.createUser(user);
//        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
//    }

}
