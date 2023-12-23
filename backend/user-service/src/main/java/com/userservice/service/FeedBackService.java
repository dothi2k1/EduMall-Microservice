package com.userservice.service;

import com.userservice.model.FeedBack;
import org.springframework.http.ResponseEntity;

public interface FeedBackService {
    ResponseEntity<?> getAllByCourseId(Long id);
    ResponseEntity<?> getAll();
    ResponseEntity<?> save(FeedBack feedBack);
    ResponseEntity<?> deleteById(Long id);
    Boolean existsById(Long id);
    ResponseEntity<?> getAllOrderByTime(int page, int direction);
    ResponseEntity<?> getAllOrderByStar(int page, int direction);
}
