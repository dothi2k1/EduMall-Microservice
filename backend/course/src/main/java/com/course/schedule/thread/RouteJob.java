package com.course.schedule.thread;

import com.course.DTO.RouteDto;
import com.course.dao.RouteDao;
import com.course.model.Course;
import com.course.service.imp.RedisServiceImp;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.List;
import java.util.concurrent.TimeUnit;

public class RouteJob implements Runnable{
    private final RedisServiceImp service;
    ObjectMapper mapper=new ObjectMapper();
    private final RouteDao dao;
    public RouteJob(RedisServiceImp service, RouteDao dao) {
        this.service = service;
        this.dao = dao;
    }

    @Override
    public void run() {
        try {
            if (service.check("queue_route")){
                String re=(String) service.rPop("queue_route");
                if (re!=null) {
                    Course course = mapper.readValue(re, Course.class);
                    List<RouteDto> list=dao.getListRout(course.getId());
                    service.setValueRedis("route_course"+course.getId(),
                            mapper.writeValueAsString(list),
                            1, TimeUnit.DAYS);
                }
            }
            Thread.sleep(4000);
        }
        catch (Exception e){
            System.out.println("Can't cache item");
        }

    }
}
