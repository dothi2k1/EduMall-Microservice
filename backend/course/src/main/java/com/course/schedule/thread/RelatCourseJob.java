package com.course.schedule.thread;

import com.course.DTO.RouteDto;
import com.course.dao.CourseDao;
import com.course.dao.RouteDao;
import com.course.model.Course;
import com.course.service.imp.RedisServiceImp;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

public class RelatCourseJob implements Runnable{
    private final RedisServiceImp service;
    ObjectMapper mapper=new ObjectMapper();
    private final CourseDao dao;
    public RelatCourseJob(RedisServiceImp service, CourseDao dao) {
        this.service = service;
        this.dao = dao;
    }

    @Override
    public void run() {
        try {
            if (service.check("queue_relative")){
                String re=(String) service.rPop("queue_relative");
                if (re!=null) {
                    Course course = mapper.readValue(re, Course.class);
                    Pageable pageable = PageRequest.of(0, 10,
                            Sort.by(Sort.Direction.ASC, "id"));
                    List<Course> list=dao.getListRelative( pageable,course.getCate(),course.getId());
                    service.setValueRedis("re_course"+course.getId(),
                            mapper.writeValueAsString(list),
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
