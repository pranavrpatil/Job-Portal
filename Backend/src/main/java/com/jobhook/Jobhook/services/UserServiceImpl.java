package com.jobhook.Jobhook.services;

import com.jobhook.Jobhook.dto.ChangePasswordDTO;
import com.jobhook.Jobhook.dto.LoginDTO;
import com.jobhook.Jobhook.dto.ResponseDTO;
import com.jobhook.Jobhook.dto.UserDTO;
import com.jobhook.Jobhook.entity.OTP;
import com.jobhook.Jobhook.entity.UserEntity;
import com.jobhook.Jobhook.exceptions.JobPortalException;
import com.jobhook.Jobhook.repository.OTPRepository;
import com.jobhook.Jobhook.repository.UserRepository;
import com.jobhook.Jobhook.utility.Data;
import com.jobhook.Jobhook.utility.Utilities;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service(value = "userService")
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final OTPRepository otpRepository;
    private final PasswordEncoder passwordEncoder;
    private final JavaMailSender javaMailSender;

    UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, JavaMailSender javaMailSender, OTPRepository otpRepository
    ){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.javaMailSender = javaMailSender;
        this.otpRepository = otpRepository;
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

    public UserDTO loginUser(LoginDTO loginDTO) throws JobPortalException {
        UserEntity existingUser = userRepository.findByEmail(loginDTO.getEmail()).orElseThrow(()->new JobPortalException("NOT_FOUND"));
        boolean isMatch = passwordEncoder.matches(loginDTO.getPassword(), existingUser.getPassword());
        if(!isMatch){
           throw new JobPortalException("INVALID_CREDENTIALS");
        }
        return existingUser.toDTO();
    }

    @Override
    public boolean sendOtp(String email) throws Exception {
//        OTP existingUser = otpRepository.findByEmail(email).orElseThrow(()->new JobPortalException("NOT_FOUND"));
        MimeMessage mm=javaMailSender.createMimeMessage();
        MimeMessageHelper messageHelper = new MimeMessageHelper(mm, true);
        messageHelper.setTo(email);
        messageHelper.setSubject("Your OTP code");
        String generateOTP = Utilities.generateOTP();
        OTP otp = new OTP(email, generateOTP, LocalDateTime.now());
        otpRepository.save(otp);
        messageHelper.setText(Data.getMessageBody(generateOTP), true);
        javaMailSender.send(mm);
        return true;
    }

    @Override
    public boolean verifyOtp(String email, String otp) throws JobPortalException {
        OTP otpEntity = otpRepository.findByEmail(email).orElseThrow(()-> new JobPortalException("OTP_NOT_FOUND"));
        if(!otpEntity.getOtpCode().equals(otp)){
            throw new JobPortalException("INCORRECT_OTP");
        }
        return true;
    }

    @Override
    public ResponseDTO changePassword(ChangePasswordDTO user) throws JobPortalException {
        UserEntity existingUser = userRepository.findByEmail(user.getEmail()).orElseThrow(()->new JobPortalException("NOT_FOUND"));
        boolean isMatch = passwordEncoder.matches(user.getOldPassword(), existingUser.getPassword());
        if(!isMatch){
            throw new JobPortalException("INCORRECT_OLD_PASSWORD");
        }
        existingUser.setPassword(passwordEncoder.encode(user.getNewPassword()));
        userRepository.save(existingUser);
        return new ResponseDTO("Password has been changed.");
    }

    @Scheduled(fixedRate = 1000)
    public void removeExpiredOTPs(){
       LocalDateTime expiryTime = LocalDateTime.now().minusMinutes(5);
       List<OTP> expiredOTPsList = otpRepository.findByCreationTimeBefore(expiryTime);
       if(!expiredOTPsList.isEmpty()){
           otpRepository.deleteAll(expiredOTPsList);
       }
    }
}
