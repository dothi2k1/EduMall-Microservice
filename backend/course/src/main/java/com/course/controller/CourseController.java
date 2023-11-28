package com.course.controller;

import com.course.model.Course;
import com.course.service.imp.CourseServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/sv2/course")
public class CourseController {
    @Autowired
    CourseServiceImp service;
    @GetMapping("get-all")
    ResponseEntity<?> getAll(int page,String sort){
        return service.getAll(page,sort);
    }
    @PostMapping("save")
    ResponseEntity<?> save(@RequestBody Course course){
        return service.save(course);
    }
}
