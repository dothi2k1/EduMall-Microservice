package com.userservice.comtroller;

import com.userservice.model.DTO.FormLogin;
import com.userservice.model.DTO.FormReg;
import com.userservice.model.DTO.MyRespon;
import com.userservice.model.User;
import com.userservice.model.user_principle.UserPrinciple;
import com.userservice.security.JwtProvider;
import com.userservice.security.JwtResponse;
import com.userservice.service.implement.UserServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/save")
    public ResponseEntity<?> register(@RequestBody FormReg signForm) {
        MyRespon myRespon = new MyRespon();
        if (serviceImp.existsByUsername(signForm.getUsername())) {
            myRespon.setMessage("The user is already used! Try again!");
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


}
