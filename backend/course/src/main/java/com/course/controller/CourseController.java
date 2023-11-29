package com.course.controller;

import com.course.enum_collect.Status;
import com.course.model.Course;
import com.course.model.Document;
import com.course.model.Route;
import com.course.model.Video;
import com.course.service.imp.CourseServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.print.Doc;

@RestController
@RequestMapping("api/sv2/course")
public class CourseController {
    @Autowired
    CourseServiceImp service;
    //course -- start
    @GetMapping("get-all")
    ResponseEntity<?> getAll(int page,String sort){
        return service.getAll(page,sort);
    }

    @PostMapping("save")
    ResponseEntity<?> save(@RequestBody Course course){
        return service.save(course);
    }

    @PutMapping("active")
    ResponseEntity<?> activeCourse(@RequestParam long id,@RequestParam int status){
        boolean stt=false;
        if (status!=0) stt=true;
        return service.activeCourse(id, stt);
    }

    //--end

    //route-start
    @PostMapping("add-route")
    ResponseEntity<?> add(@RequestBody Route route){
        return service.addRoutes(route);
    }

    @GetMapping("get-list-route")
    ResponseEntity<?> getListRoute(@RequestParam long id){
        return service.getAllRoute(id);
    }


    //--end

    //Video and doc -- start
    @PostMapping("add-video")
    ResponseEntity<?> addVideo(@RequestBody Video video){
        return service.addVideo(video);
    }

    @GetMapping("get-list-video")
    ResponseEntity<?> getListVideo(@RequestParam long id){
        return service.getVideo(id);
    }

    @PostMapping("add-video")
    ResponseEntity<?> addDocument(@RequestBody Document document){
        return service.addDoc(document);
    }

    @GetMapping("get-list-document")
    ResponseEntity<?> getListDocument(@RequestParam long id){
        return service.getDocument(id);
    }
    //--end
}
