package com.course.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.http.ResponseEntity;

import java.net.ConnectException;


public interface RedisService {
    void clear();
    ResponseEntity<?> getAllCourse(int page,String sort) throws JsonProcessingException, Exception;
    ResponseEntity<?> relativeCourse(int page,long category) throws JsonProcessingException;

}
