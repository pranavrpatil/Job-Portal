package com.jobhook.Jobhook.controller;

import com.jobhook.Jobhook.dto.ChangePasswordDTO;
import com.jobhook.Jobhook.dto.LoginDTO;
import com.jobhook.Jobhook.dto.ResponseDTO;
import com.jobhook.Jobhook.dto.UserDTO;
import com.jobhook.Jobhook.entity.UserEntity;
import com.jobhook.Jobhook.exceptions.JobPortalException;
import com.jobhook.Jobhook.services.UserService;
import com.jobhook.Jobhook.services.UserServiceImpl;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@Validated
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    UserController(UserServiceImpl userService){
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

    @PostMapping("/sendOtp/{email}")
    public ResponseEntity<ResponseDTO> sendOtp(@PathVariable @Email(message = "{user.email.invalid}") String email) throws Exception {
         userService.sendOtp(email);
        return new ResponseEntity<>(new ResponseDTO("OTP sent successfully."), HttpStatus.OK);
    }

    @GetMapping("/verifyOtp/{email}/{otp}")
    public ResponseEntity<ResponseDTO> verifyOtp(@PathVariable @Email(message = "{user.email.invalid}") String email, @PathVariable @Pattern(regexp = "^[0-9]{6}$", message = "{INVALID_OTP}") String otp) throws JobPortalException {
        userService.verifyOtp(email, otp);
        return new ResponseEntity<>(new ResponseDTO("OTP has been verified."), HttpStatus.ACCEPTED);
    }

    @PostMapping("/changePassword")
    public ResponseEntity<ResponseDTO> changePassword(@RequestBody @Valid ChangePasswordDTO changePasswordDTO) throws JobPortalException {
        ResponseDTO user = userService.changePassword(changePasswordDTO);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

}
