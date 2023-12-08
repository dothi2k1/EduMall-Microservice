package com.userservice.service;

import com.userservice.model.Discussion;
import com.userservice.model.FeedBack;
import org.springframework.http.ResponseEntity;

public interface DiscussionService {
    ResponseEntity<?> save(Discussion discussion);
    ResponseEntity<?> deleteById(Long id);
    Boolean existsById(Long id);
    ResponseEntity<?> getAllOrderByTime(int page, int direction);
}
