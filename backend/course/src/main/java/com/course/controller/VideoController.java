package com.course.controller;

import com.course.model.Video;
import com.course.service.imp.VideoServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/sv2/video")
public class VideoController {
    @Autowired
    VideoServiceImp service;

    @PostMapping("add-video")
    ResponseEntity<?> addVideo(@RequestBody Video video){
        return service.addVideo(video);
    }

    @GetMapping("get-list-video")
    ResponseEntity<?> getListVideo(@RequestParam long id){
        return service.getVideo(id);
    }

}
