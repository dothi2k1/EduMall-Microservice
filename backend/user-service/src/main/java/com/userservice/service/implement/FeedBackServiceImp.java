package com.userservice.service.implement;

import com.userservice.model.FeedBack;
import com.userservice.repository.FeedBackRepository;
import com.userservice.service.FeedBackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class FeedBackServiceImp implements FeedBackService {
    @Autowired
    FeedBackRepository feedBackRepository;
    @Override
    public ResponseEntity<?> save(FeedBack feedBack) {
        if (feedBack == null) {
            return ResponseEntity.status(500).body("False");
        }
        return ResponseEntity.ok(feedBackRepository.save(feedBack));
    }

    @Override
    public ResponseEntity<?> deleteById(Long id) {
        if (!existsById(id)) {
            return ResponseEntity.status(400).body("False");
        }
        feedBackRepository.deleteById(id);
        return ResponseEntity.ok("Delete successful");
    }

    @Override
    public Boolean existsById(Long id) {
        return feedBackRepository.existsById(id);
    }

    @Override
    public ResponseEntity<?> getAll(int page, String sort) {
        Pageable pageable= PageRequest.of(page,20,
                Sort.by(Sort.Direction.ASC,sort));
        return ResponseEntity.ok(feedBackRepository.findAll(pageable));
    }

}
