package com.userservice.service;

import com.userservice.model.DTO.UserDTO;
import org.springframework.http.ResponseEntity;

public interface UserService {
    ResponseEntity<?> findByUsername(String username);
    ResponseEntity<?> save(UserDTO userDTO);
    ResponseEntity<?> findById(int id);
    ResponseEntity<?> getAll();
}
