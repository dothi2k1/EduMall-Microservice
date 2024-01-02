package com.course.schedule.thread;

import com.course.DTO.CourseSummary;
import com.course.DTO.RouteDto;
import com.course.dao.DocumentDao;
import com.course.dao.RouteDao;
import com.course.dao.VideoDao;
import com.course.model.Course;
import com.course.service.imp.RedisServiceImp;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.List;
import java.util.concurrent.TimeUnit;

public class RouteJob implements Runnable{
    private final RedisServiceImp service;
    private final VideoDao videoDao;
    private final DocumentDao documentDao;
    ObjectMapper mapper=new ObjectMapper();
    private final RouteDao dao;
    public RouteJob(RedisServiceImp service, RouteDao dao,VideoDao videoDao,DocumentDao documentDao) {
        this.service = service;
        this.dao = dao;
        this.documentDao=documentDao;
        this.videoDao=videoDao;
    }

    @Override
    public void run() {
        try {
            if (service.check("queue_route")){
                String re=(String) service.rPop("queue_route");
                if (re!=null) {
                    CourseSummary course = mapper.readValue(re, CourseSummary.class);
                    List<RouteDto> list=dao.getListRout(course.getId());
                    if (!list.isEmpty()) {
                        for (RouteDto i:list){
                            i.setDocuments(documentDao.listDocument(i.getId()));
                            i.setVideos(videoDao.listVideo(i.getId()));
                        }
                        service.setValueRedis("route_course" + course.getId(),
                                mapper.writeValueAsString(list),
                                1, TimeUnit.DAYS);
                    }
                    System.out.println(Thread.currentThread()+" "+"done");
                }
            }
            Thread.sleep(4000);
        }
        catch (Exception e){
            e.printStackTrace();
            System.out.println("Route: Can't cache item");
        }

    }
}
