package com.course.schedule;

import com.course.DTO.CourseDTo;
import com.course.DTO.CourseSummary;
import com.course.dao.*;
import com.course.model.Course;
import com.course.model.Process;
import com.course.repository.ProcessRepo;
import com.course.schedule.thread.CourseJob;
import com.course.schedule.thread.RelatCourseJob;
import com.course.schedule.thread.RouteJob;
import com.course.service.imp.RedisServiceImp;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.concurrent.*;
import java.util.stream.Collectors;

@Component
public class ScheduleService {
    @Autowired
    ProcessRepo repo;
    @Autowired
    CourseDao dao;
    @Autowired
    CategoryDao cateDao;
    @Autowired
    RouteDao routeDao;
    @Autowired
    RedisServiceImp service;
    @Autowired
    ObjectMapper redisMapper;
    @Autowired
    RedisTemplate<String, Object> template;
    @Autowired
    VideoDao videoDao;
    @Autowired
    DocumentDao documentDao;
    List<String> queue = Arrays.asList(new String[]{"queue_course", "queue_relative", "queue_route"});

    //All course
    void addProcess() {
        String[] processes = new String[]{"queue_course", "queue_relative", "queue_route"};
        System.out.println("add process");
        List<Process> list = repo.findAll();
        if (list.size() == 0)
            for (int i = 0; i < processes.length; i++) {
                Process process = new Process();
                process.setName(processes[i]);
                process.setStatus(true);
                process.setCreate_at(new Date());
                process.setLast_update(process.getCreate_at());
                process.setTimeout(5);
                repo.save(process);
            }
    }


    @Scheduled(fixedDelay = 1, timeUnit = TimeUnit.DAYS)
    void doProcess() throws JsonProcessingException {
        System.out.println("do task");
        List<CourseSummary> list = dao.getAll();
        long count=dao.getTotalPage();
        long totalPage=(count%10==0)?count/10:count/10+1;
        for (int i = 0; i < totalPage; i++) {
            List<Course>courses= dao.getList(
                    PageRequest.of(0, 10),"id");
            service.setValueRedis("page"+i,redisMapper.writeValueAsString(courses),1,TimeUnit.DAYS );
        }


        List<String> jsons = list.stream().map(v -> {
            try {
                return redisMapper.writeValueAsString(v);
            } catch (JsonProcessingException e) {
                e.printStackTrace();
                return null;
            }
        }).collect(Collectors.toList());
            if (!list.isEmpty())
                for (String q : queue)
                    for (String s : jsons)
                        service.lPush(q, s);



        ExecutorService executor = Executors.newFixedThreadPool(5);
        for (CourseSummary c : list) {
            executor.submit(new CourseJob(service,dao,videoDao,documentDao));
            executor.submit(new RouteJob(service, routeDao,videoDao,documentDao));
            executor.submit(new RelatCourseJob(service, dao));
        }
    }


}
