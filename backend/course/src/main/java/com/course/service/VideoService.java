package com.course.service;

import com.course.model.Video;
import org.springframework.http.ResponseEntity;

public interface VideoService {
    ResponseEntity<?> getVideo(long routeId);
    ResponseEntity<?> addVideo(Video video);
}
