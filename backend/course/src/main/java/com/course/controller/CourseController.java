package com.course.controller;

import com.course.model.Course;

import com.course.schedule.ScheduleService;
import com.course.service.imp.CourseServiceImp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/sv2/course")
public class CourseController {
    @Autowired
    CourseServiceImp service;

    //course -- start
    @GetMapping("/get-all")
    ResponseEntity<?> getAll(int page, String sort) throws Exception {
        return service.getAll(page, sort);
    }
    @GetMapping("/get-course")
    ResponseEntity<?> getById(@RequestParam long id) {
        return service.findCourseById(id);
    }
    @PostMapping("/private/save")
    ResponseEntity<?> save(@RequestBody Course course) {
        return service.save(course);
    }

    @PutMapping("/private/active")
    ResponseEntity<?> activeCourse(@RequestParam long id, @RequestParam int status) {
        boolean stt = false;
        if (status != 0) stt = true;
        return service.activeCourse(id, stt);
    }

    //--end


}
