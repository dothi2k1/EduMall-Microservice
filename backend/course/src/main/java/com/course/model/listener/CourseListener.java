package com.course.model.listener;

import com.course.model.Course;
import com.course.service.imp.RedisServiceImp;
import jakarta.persistence.PostPersist;
import jakarta.persistence.PostUpdate;
import org.springframework.beans.factory.annotation.Autowired;

public class CourseListener {
    @Autowired
    RedisServiceImp redisService;
    //clear when insert new
    @PostPersist
    public void postSave(Course course){
        redisService.clear();
    }

    //clear when update
    @PostUpdate
    public void postUpdate(Course course){
        redisService.clear();
    }

}
