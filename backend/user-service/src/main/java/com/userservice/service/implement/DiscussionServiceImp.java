package com.userservice.service.implement;

import com.userservice.model.Discussion;
import com.userservice.repository.DiscussionRepo;
import com.userservice.service.DiscussionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class DiscussionServiceImp implements DiscussionService {
    @Autowired
    DiscussionRepo discussionRepo;
    @Override
    public ResponseEntity<?> save(Discussion discussion) {
        return null;
    }

    @Override
    public ResponseEntity<?> modify(Discussion discussion) {
        return null;
    }

    @Override
    public ResponseEntity<?> deleteDiscussionById(Long id) {
        return null;
    }

    @Override
    public ResponseEntity<?> getAllByUsername(String username) {
        return null;
    }

    @Override
    public ResponseEntity<?> getAllByScid(Long id) {
        return null;
    }
}
