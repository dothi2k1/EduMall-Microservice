package com.user_service.service.implement;

import com.user_service.model.DTO.UserDTO;
import com.user_service.model.User;
import com.user_service.repository.UserRepository;
import com.user_service.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;

public class UserServiceImp implements UserService {
    @Autowired
    UserRepository repository;
    @Autowired
    PasswordEncoder encoder;
    @Override
    public ResponseEntity<?> findByUsername(String username) {
        return ResponseEntity.ok(repository.findByUsername(username));
    }

    @Override
    public ResponseEntity<?> save(UserDTO userDTO) {
        User user=new User();
        user.setUsername(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());
        user.setPassword(encoder.encode(userDTO.getPassword()));

        
        return null;
    }

    @Override
    public ResponseEntity<?> findById(int id) {
        return null;
    }

    @Override
    public ResponseEntity<?> getAll() {
        return null;
    }
}
