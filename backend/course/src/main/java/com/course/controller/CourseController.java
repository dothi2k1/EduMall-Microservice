package com.course.controller;

import com.course.service.imp.CourseServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/sv2/course")
public class CourseController {
    @Autowired
    CourseServiceImp service;
    @GetMapping("get-all")
    ResponseEntity<?> getAll(int page,String sort){
        return service.getAll(page,sort);
    }
}
