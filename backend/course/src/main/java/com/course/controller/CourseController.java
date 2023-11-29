package com.course.controller;

import com.course.enum_collect.Status;
import com.course.model.Course;
import com.course.model.Route;
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

    @PostMapping("add-rout")
    ResponseEntity<?> add(@RequestBody Route route){
        return service.addRoutes(route);
    }

    @GetMapping("get-list-rout")
    ResponseEntity<?> getList(int page,String sort){
        return service.getAll(page,sort);
    }

}
