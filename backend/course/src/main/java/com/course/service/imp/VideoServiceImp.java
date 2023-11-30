package com.course.service.imp;

import com.course.dao.VideoDao;
import com.course.model.Video;
import com.course.service.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class VideoServiceImp implements VideoService {
    @Autowired
    VideoDao dao;
    @Override
    public ResponseEntity<?> getVideo(long routeId) {
        return ResponseEntity.ok(dao.listVideo(routeId));
    }

    @Override
    public ResponseEntity<?> addVideo(Video video) {
        video.setCreate_at(new Date());
        video.setStatus(true);
        long rs=0;
        rs=dao.addVideo(video);
        if (rs!=0) return ResponseEntity.ok(rs);
        return ResponseEntity.status(400).body("Can't add video. Try again!");
    }


}
