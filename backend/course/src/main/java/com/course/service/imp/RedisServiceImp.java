package com.course.service.imp;

import com.course.DTO.CourseDTo;
import com.course.model.Course;
import com.course.service.RedisService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.RedisConnectionFailureException;
import org.springframework.data.redis.connection.RedisConnection;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.net.ConnectException;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RedisServiceImp implements RedisService {

    private final RedisTemplate<String,Object> template;

    private final ObjectMapper redisMapper;

    // check connect
    boolean checkRedisConnect(){
        if (template==null) return false;
        return true;
    }
    //clear cache
    @Override
    public void clear() {
        template.getConnectionFactory().getConnection().serverCommands().flushAll();
    }
    public void setValueRedis(String key, Object value) {
        template.opsForValue().set(key, value);
    }

    @Override
    public ResponseEntity<?> getAllCourse(int page, String sort) throws Exception {
        String key="courses"+page+"-"+sort;
        String json="";
            json = (String) template.opsForValue().get(key);

        List<Course> list=
                (json!=null) ?
                        redisMapper.readValue(json, new TypeReference<List<Course>>() {})
                        :null;
        if (list==null) return null;
        return ResponseEntity.ok(list);
    }

    @Override
    public ResponseEntity<?> relativeCourse(int page,long category) throws JsonProcessingException {
        String key="reCourse"+page+"-"+category;
        String json=(String) template.opsForValue().get(key);
        List<CourseDTo> list=
                (json!=null)?
                        redisMapper.readValue(json, new TypeReference<List<CourseDTo>>() {})
                        :null;
        if (list==null) return null;
        return ResponseEntity.ok(list);
    }


}