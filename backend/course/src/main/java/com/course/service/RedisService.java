package com.course.service;

import com.course.model.Course;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.http.ResponseEntity;

public interface RedisService {
    void clear();
    ResponseEntity<?> getAllCourse(int page,String sort) throws JsonProcessingException;
    ResponseEntity<?> relativeCourse(int page) throws JsonProcessingException;
    ResponseEntity<?> addCourseToRedis(Course course) throws JsonProcessingException;

}
