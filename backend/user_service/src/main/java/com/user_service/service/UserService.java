package com.user_service.service;

import com.user_service.model.DTO.UserDTO;
import org.springframework.http.ResponseEntity;

public interface UserService {
    ResponseEntity<?> findByUsername(String username);
    ResponseEntity<?> save(UserDTO userDTO);
    ResponseEntity<?> findById(int id);
    ResponseEntity<?> getAll();
}
