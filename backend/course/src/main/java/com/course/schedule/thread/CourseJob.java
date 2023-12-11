package com.course.schedule.thread;

import com.course.model.Course;
import com.course.service.imp.RedisServiceImp;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.concurrent.TimeUnit;

public class CourseJob implements Runnable{
    private final RedisServiceImp service;
    ObjectMapper mapper=new ObjectMapper();

    public CourseJob(RedisServiceImp service) {
        this.service = service;
    }

    @Override
    public void run() {
        try {
            if (service.check("queue_course")){
                String re= service.rPop("queue_course");
                if (re!=null) {
                    Course course = mapper.readValue(re, new TypeReference<Course>() {
                    });
                    service.setValueRedis("course"+course.getId(),
                            mapper.writeValueAsString(course),
                            1, TimeUnit.DAYS);
                    System.out.println(Thread.currentThread()+" "+"done");
                }
            }
            Thread.sleep(4000);
        }
        catch (Exception e){
            System.out.println("Can't cache item");
        }

    }
}
