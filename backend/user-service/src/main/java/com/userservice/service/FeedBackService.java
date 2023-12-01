package com.userservice.service;

import com.userservice.model.FeedBack;
import org.springframework.http.ResponseEntity;

public interface FeedBackService {
    ResponseEntity<?> save(FeedBack feedBack);
    ResponseEntity<?> modify(FeedBack feedBack);
    ResponseEntity<?> deleteFeedBackById(Long id);
    ResponseEntity<?> getAllByUsername(String username);
    ResponseEntity<?> getAllByOddt_id(Long id);
}
