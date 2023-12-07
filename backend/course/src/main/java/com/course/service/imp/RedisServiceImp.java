package com.course.service.imp;

import com.course.DTO.CourseDTo;
import com.course.DTO.CourseResponse;
import com.course.DTO.RouteDto;
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

import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;


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
    public void lPush(String key, Object o) {
        template.opsForList().leftPush(key,o);
    }

    @Override
    public Object rPop(String key) {
        template.opsForList().rightPop(key);
        return null;
    }

    @Override
    public boolean check(String key) throws NullPointerException{
        return template.hasKey(key);
    }

    @Override
    public void lPushAll(String key, List<Object> list) {
        template.opsForList().leftPushAll(key,list);
    }

    @Override
    public ResponseEntity<?> getAllCourse(int page) {
        try {
            String json = (String) template.opsForValue().get("course_list");
            List<Course> list =redisMapper.readValue(json, new TypeReference<List<Course>>() {
            });
            return ResponseEntity.ok(list.stream().limit(10).skip(page*10-1));
        }
        catch (Exception e){
            System.out.println("no response");
        }
        return null;
    }

    @Override
    public ResponseEntity<?> getCourseById(long id) {
        try {
            String json = (String) template.opsForValue().get("course" + id);
            Course c= redisMapper.convertValue(json, new TypeReference<Course>() {
            });
            String routJson=(String) template.opsForValue().get("route_course"+id);
            List<RouteDto> routeDtos=redisMapper.readValue(routJson, new TypeReference<List<RouteDto>>() {
            });
            String reJson=(String) template.opsForValue().get("re_course"+id);
            List<Course> relative=redisMapper.readValue(reJson, new TypeReference<List<Course>>() {
            });
            return ResponseEntity.ok(new CourseResponse(c,routeDtos,relative));
        }
        catch (Exception e){
            return null;
        }
    }

    public void setValueRedis(String key, Object value,int ttl, TimeUnit t){
        if (ttl!=0)
            template.opsForValue().set(key, value,ttl,t);
        else template.opsForValue().set(key,value);
    }


}
