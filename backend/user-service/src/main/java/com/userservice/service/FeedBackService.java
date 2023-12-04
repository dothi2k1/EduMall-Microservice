package com.userservice.service;

import com.userservice.model.FeedBack;
import org.springframework.http.ResponseEntity;

public interface FeedBackService {
    ResponseEntity<?> save(FeedBack feedBack);
    ResponseEntity<?> deleteById(Long id);
    Boolean existsById(Long id);
    ResponseEntity<?> getAll(int page,String sort);
}
