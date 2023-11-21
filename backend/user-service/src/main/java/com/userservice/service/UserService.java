package com.userservice.service;

import com.userservice.model.DTO.FormReg;
import org.springframework.http.ResponseEntity;

public interface UserService {
    ResponseEntity<?> findByUsername(String username);
    ResponseEntity<?> save(FormReg formReg);
    ResponseEntity<?> findById(int id);
    ResponseEntity<?> getAll(int page,String sort);
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);
}
