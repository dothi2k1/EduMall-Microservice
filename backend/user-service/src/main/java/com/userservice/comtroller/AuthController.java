package com.userservice.comtroller;

import com.userservice.model.DTO.FormLogin;
import com.userservice.model.DTO.FormReg;
import com.userservice.model.DTO.MyRespon;
import com.userservice.model.User;
import com.userservice.model.request.PasswordResetRequest;
import com.userservice.model.user_principle.UserPrinciple;
import com.userservice.password_reset.IPasswordResetService;
import com.userservice.password_reset.PasswordResetService;
import com.userservice.security.JwtProvider;
import com.userservice.security.JwtResponse;
import com.userservice.service.implement.UserServiceImp;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Random;

@RestController
@RequestMapping("user")
@CrossOrigin("*")
public class AuthController {
    @Autowired
    UserServiceImp serviceImp;
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    JwtProvider jwtProvider;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    IPasswordResetService resetPassword;

    @Autowired
    JavaMailSender javaMailSender;


    @PostMapping("/save")
    public ResponseEntity<?> register(@RequestBody FormReg signForm) {
        MyRespon myRespon = new MyRespon();
        if (serviceImp.existsByUsername(signForm.getUsername())) {
            myRespon.setMessage("The user name is already used! Try again!");
            return new ResponseEntity<>(myRespon.getMessage(), HttpStatus.OK);
        }
        if (serviceImp.existsByEmail(signForm.getEmail())) {
            myRespon.setMessage("The email is already used! Try again!");
            return new ResponseEntity<>(myRespon.getMessage(), HttpStatus.OK);
        }
        serviceImp.save(signForm);
        myRespon.setMessage("create user success");
        return new ResponseEntity<>(myRespon.getMessage(), HttpStatus.OK);
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody FormLogin loginForm) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginForm.getUsername(), loginForm.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtProvider.generateToken(authentication);
        UserPrinciple userPrincipal = (UserPrinciple) authentication.getPrincipal();
        return ResponseEntity.ok(
                new JwtResponse(userPrincipal.getUsername(), token, userPrincipal.getAuthorities()));
    }

    @GetMapping("/getall")
    ResponseEntity<?> getAll(@RequestParam int page,@RequestParam String sort){
        return serviceImp.getAll(page,sort);
    }
    @PostMapping(value = "/forget-password")
    public ResponseEntity<String> forgotPass(@RequestBody PasswordResetRequest resetRequest, HttpServletRequest request) {
        String token = "";
        User user = serviceImp.findByEmail(resetRequest.getEmail());
        if (serviceImp.existsByEmail(resetRequest.getEmail()))
            token += new Random().nextLong(100000,1000000);
        resetPassword.generatePassReset(user, token);
        SimpleMailMessage message=new SimpleMailMessage();
        message.setTo("aloalo1981998@gmail.com");
        message.setSubject("Click to reset your password");
        message.setText(token);
        javaMailSender.send(message);
        return ResponseEntity.ok("A verified code was been sent to your email. Please check your email!");
    }
    @PostMapping(value = "/reset-password")
    public ResponseEntity<?> resetPass(@RequestBody PasswordResetRequest request, @RequestParam("token") String token){
        if (!resetPassword.validateToken(token).equalsIgnoreCase("valid"))
            return ResponseEntity.ok("Invalid code");
        User user= resetPassword.findByToken(token);
        if (user!= null)
            serviceImp.resetPassword(user,request.getPassword());
        return ResponseEntity.ok("password reset successfully");

    }


}
