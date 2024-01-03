package com.course.schedule.thread;

import com.course.DTO.CourseDTo;
import com.course.DTO.CourseResponse;
import com.course.DTO.CourseSummary;
import com.course.DTO.RouteDto;
import com.course.dao.CourseDao;
import com.course.dao.DocumentDao;
import com.course.dao.RouteDao;
import com.course.dao.VideoDao;
import com.course.model.Course;
import com.course.service.imp.RedisServiceImp;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Builder;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.concurrent.TimeUnit;

public class CourseJob implements Runnable{
    private final RedisServiceImp service;
    private final CourseDao dao;
    private final VideoDao videoDao;
    private final DocumentDao documentDao;
    ObjectMapper mapper=new ObjectMapper();

    public CourseJob(RedisServiceImp service,CourseDao dao,VideoDao videoDao,DocumentDao documentDao) {
        this.service = service;
        this.dao=dao;
        this.documentDao=documentDao;
        this.videoDao=videoDao;
    }

    @Override
    public void run() {
        try {
            if (service.check("queue_course")){
                String re= service.rPop("queue_course");
                if (re!=null) {
                    CourseSummary course = mapper.readValue(re, new TypeReference<CourseSummary>() {
                    });
                    CourseDTo courseDTo= dao.findCourseById(course.getId());
                    courseDTo.setDoc(documentDao.countByCourseId(course.getId()));
                    courseDTo.setVideos(videoDao.countByCourseId(course.getId()));
                    service.setValueRedis("course"+course.getId(),
                            mapper.writeValueAsString(courseDTo),
                            1, TimeUnit.DAYS);
                    System.out.println(Thread.currentThread()+" "+"done");
                }
            }
            Thread.sleep(4000);
        }
        catch (Exception e){
            e.printStackTrace();
            System.out.println("Course: Can't cache item");
        }

    }
}
