package com.userservice.service.implement;

import com.userservice.model.FeedBack;
import com.userservice.repository.FeedBackRepository;
import com.userservice.service.FeedBackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class FeedBackServiceImp implements FeedBackService {
    @Autowired
    FeedBackRepository feedBackRepository;

    @Override
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(feedBackRepository.findAll());
    }

    @Override
    public ResponseEntity<?> save(FeedBack feedBack) {
        if (feedBack == null) {
            return ResponseEntity.status(400).body("False");
        }
        return ResponseEntity.ok(feedBackRepository.save(feedBack));
    }

    @Override
    public ResponseEntity<?> deleteById(Long id) {
        if (!existsById(id)) {
            return ResponseEntity.status(400).body("Not found");
        }
        feedBackRepository.deleteById(id);
        return ResponseEntity.ok("Delete successful");
    }

    @Override
    public Boolean existsById(Long id) {
        return feedBackRepository.existsById(id);
    }

    @Override
    public ResponseEntity<?> getAllOrderByTime(int page, int direction) {
        switch (direction) {

            case 1: Pageable pageable1 = PageRequest.of(page,20);
                return ResponseEntity.ok(feedBackRepository.getFeedBacksByIdNotNullOrderByCreateatAsc(pageable1).getContent());

            case 2: Pageable pageable2 = PageRequest.of(page,20);
                return ResponseEntity.ok(feedBackRepository.getFeedBacksByIdNotNullOrderByCreateatDesc(pageable2).getContent());
        }
        return ResponseEntity.status(400).body("False");
    }

    @Override
    public ResponseEntity<?> getAllOrderByStar(int page, int direction) {
        switch (direction) {
            case 1: Pageable pageable1 = PageRequest.of(page,20,
                    Sort.by(Sort.Direction.ASC,"star"));
                return ResponseEntity.ok(feedBackRepository.findAll(pageable1).getContent());
            case 2: Pageable pageable2 = PageRequest.of(page,20,
                    Sort.by(Sort.Direction.DESC,"star"));
                return ResponseEntity.ok(feedBackRepository.findAll(pageable2).getContent());
        }
        return ResponseEntity.status(400).body("False");
    }

}
