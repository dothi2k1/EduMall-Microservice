package com.userservice.service.implement;

import com.userservice.model.Discussion;
import com.userservice.model.FeedBack;
import com.userservice.repository.DiscussionRepository;
import com.userservice.service.DiscussionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class DiscussionServiceImp implements DiscussionService {
    @Autowired
    DiscussionRepository discussionRepository;
    @Override
    public ResponseEntity<?> save(Discussion discussion) {
        if (discussion == null) {
            return ResponseEntity.status(400).body("False");
        }
        return ResponseEntity.ok(discussionRepository.save(discussion));
    }

    @Override
    public ResponseEntity<?> deleteById(Long id) {
        if (!existsById(id)) {
            return ResponseEntity.status(400).body("Not found");
        }
        discussionRepository.deleteById(id);
        return ResponseEntity.ok("Delete successful");
    }

    @Override
    public Boolean existsById(Long id) {
        return discussionRepository.existsById(id);
    }

    @Override
    public ResponseEntity<?> getAllOrderByTime(int page, int direction) {
        switch (direction) {
            case 1: Pageable pageable1 = PageRequest.of(page,20,
                    Sort.by(Sort.Direction.ASC,"created_at"));
                return ResponseEntity.ok(discussionRepository.findAll(pageable1));
            case 2: Pageable pageable2 = PageRequest.of(page,20,
                    Sort.by(Sort.Direction.DESC,"created_at"));
                return ResponseEntity.ok(discussionRepository.findAll(pageable2));
        }
        return ResponseEntity.status(400).body("False");
    }
}
