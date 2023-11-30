package com.course.controller;

import com.course.enum_collect.Status;
import com.course.model.Course;
import com.course.model.Document;
import com.course.model.Route;
import com.course.model.Video;
import com.course.service.imp.CourseServiceImp;
import com.course.service.imp.RedisServiceImp;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.print.Doc;

@RestController
@RequestMapping("api/sv2/course")
public class CourseController {
    @Autowired
    CourseServiceImp service;
    @Autowired
    RedisServiceImp redis;
    //course -- start
    @GetMapping("get-all")
    ResponseEntity<?> getAll(int page,String sort) throws JsonProcessingException {
        ResponseEntity<?> entity=redis.getAllCourse(page,sort);
        if (entity==null) {
            return service.getAll(page,sort);
        }

        return entity;
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


}
