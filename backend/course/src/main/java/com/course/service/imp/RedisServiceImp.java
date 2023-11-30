package com.course.service.imp;

import com.course.DTO.CourseDTo;
import com.course.model.Course;
import com.course.service.RedisService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
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
        String key="courses"+page+"-"+sort;
        String json=(String) template.opsForValue().get(key);
        List<Course> list=
                (json!=null) ?
                        redisMapper.readValue(json, new TypeReference<List<Course>>() {})
                        :new ArrayList<>();
        return ResponseEntity.ok(list);
    }

    @Override
    public ResponseEntity<?> relativeCourse(int page,long category) throws JsonProcessingException {
        String key="reCourse"+page+"-"+category;
        String json=(String) template.opsForValue().get(key);
        List<CourseDTo> list=
                (json!=null)?
                        redisMapper.readValue(json, new TypeReference<List<CourseDTo>>() {})
                        :new ArrayList<>();
        return ResponseEntity.ok(list);
    }

    @Override
    public ResponseEntity<?> addAllCourseToRedis(List<Course> list,int page) throws JsonProcessingException {
        String key=list.toString()+page;
        String json= (String) template.opsForValue().get(key);
        List<CourseDTo> dTos=
                (json!=null)?
                        redisMapper.readValue(json, new TypeReference<List<CourseDTo>>() {})
                        :new ArrayList<>();
        return ResponseEntity.ok(dTos);
    }

    @Override
    public ResponseEntity<?> addCourseRelativeToRedis(List<Course> course,long category,int page) throws JsonProcessingException {
        String key=course.toString()+category+"-"+page;
        String json= (String) template.opsForValue().get(key);
        List<CourseDTo> dTos=
                (json!=null)?
                        redisMapper.readValue(json, new TypeReference<List<CourseDTo>>() {})
                        :new ArrayList<>();
        return ResponseEntity.ok(dTos);
    }
}
