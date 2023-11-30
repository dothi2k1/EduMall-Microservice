package com.course.service;

import com.course.model.Course;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface RedisService {
    void clear();
    ResponseEntity<?> getAllCourse(int page,String sort) throws JsonProcessingException;
    ResponseEntity<?> relativeCourse(int page,long category) throws JsonProcessingException;
    ResponseEntity<?> addAllCourseToRedis(List<Course> course,int page) throws JsonProcessingException;
    ResponseEntity<?> addCourseRelativeToRedis(List<Course> course,long category,int page) throws JsonProcessingException;

}
