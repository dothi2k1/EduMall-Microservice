package com.course.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.http.ResponseEntity;

import java.net.ConnectException;
import java.util.List;


public interface RedisService {
    void clear();
    void lPush(String key ,String o);
    String rPop(String key);
    boolean check(String key);
    void lPushAll(String key,List<?> list);
    ResponseEntity<?> getAllCourse(int page );
    ResponseEntity<?> getCourseById(long id);
}
