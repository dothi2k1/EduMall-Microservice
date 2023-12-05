package com.course.service.imp;

import com.course.DTO.CourseDTo;
import com.course.model.Course;
import com.course.service.RedisService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.RedisConnectionFailureException;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.concurrent.TimeUnit;


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

    public void setValueRedis(String key, Object value,int ttl, TimeUnit t)throws JsonProcessingException {
        if (ttl!=0)
            template.opsForValue().set(key, value,ttl,t);
        else template.opsForValue().set(key,value);
    }

    @Override
    public ResponseEntity<?> getAllCourse(int page, String sort) {
        String key="course"+page;
        try {
            Object json= template.opsForValue().get(key);
            if (json!=null)
            return ResponseEntity.ok(json);
        }
          catch (RedisConnectionFailureException e) {
              System.out.println("Fail connect to redis");
          }
        catch (RuntimeException e){
            System.out.println("No response");
        }
        return null;
    }

    @Override
    public ResponseEntity<?> relativeCourse(int page,long category) {
        String key="reCourse"+page+category;
        try {
           Object json = template.opsForValue().get(key);
           if (json!=null)
            return ResponseEntity.ok(json);
        }
        catch (RedisConnectionFailureException e) {
            System.out.println("Fail connect to redis");
        }
        catch (RuntimeException e){
            System.out.println("No response");
        }
        return null;
    }


}
