package com.userservice.service;

import com.userservice.model.Discussion;
import com.userservice.model.FeedBack;
import org.springframework.http.ResponseEntity;

public interface DiscussionService {
    ResponseEntity<?> save(Discussion discussion);
    ResponseEntity<?> modify(Discussion discussion);
    ResponseEntity<?> deleteDiscussionById(Long id);
    ResponseEntity<?> getAllByUsername(String username);
    ResponseEntity<?> getAllByScid(Long id);
}
