package com.course.service.imp;

import com.course.model.Course;
import com.course.service.RedisService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.ResponseEntity;

public class RedisServiceImp implements RedisService {
    @Autowired
    RedisTemplate<String,Object> template;
    @Autowired
    ObjectMapper redisMapper;

    //clear cache
    @Override
    public void clear() {
        template.getConnectionFactory().getConnection().serverCommands().flushAll();
    }

    @Override
    public ResponseEntity<?> getAllCourse(int page, String sort) throws JsonProcessingException {
        return null;
    }

    @Override
    public ResponseEntity<?> relativeCourse(int page) throws JsonProcessingException {
        return null;
    }

    @Override
    public ResponseEntity<?> addCourseToRedis(Course course) throws JsonProcessingException {
        return null;
    }
}
