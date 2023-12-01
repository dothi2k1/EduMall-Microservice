package com.userservice.service.implement;

import com.userservice.model.FeedBack;
import com.userservice.repository.FeedBackRepo;
import com.userservice.service.FeedBackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;
@Service
public class FeedBackServiceImp implements FeedBackService {
    @Autowired
    FeedBackRepo feedBackRepo;
    @Override
    public ResponseEntity<?> save(FeedBack feedBack) {
        FeedBack fb = new FeedBack();
        fb.setContent(feedBack.getContent());
        fb.setStar(feedBack.getStar());
        fb.setCreate_at(new Date());
        fb.setOddt_id(feedBack.getOddt_id());
        FeedBack feedBack1 = feedBackRepo.save(fb);
        return ResponseEntity.ok(200);
    }

    @Override
    public ResponseEntity<?> deleteFeedBackById(Long id) {
        return feedBackRepo.deleteFeedBackById(id);
    }

    @Override
    public ResponseEntity<?> getAllByUsername(String username) {
        return (ResponseEntity<?>) feedBackRepo.getAllByUsername(username);
    }

    @Override
    public ResponseEntity<?> getAllByOddt_id(Long id) {
        return (ResponseEntity<?>) feedBackRepo.getAllByOddt_id(id);
    }
}
