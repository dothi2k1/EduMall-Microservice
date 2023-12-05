package com.course.schedule;

import com.course.DTO.CourseDTo;
import com.course.DTO.RouteDto;
import com.course.dao.CategoryDao;
import com.course.dao.CourseDao;
import com.course.dao.RouteDao;
import com.course.model.Category;
import com.course.model.Course;
import com.course.model.Process;
import com.course.repository.ProcessRepo;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.redis.RedisConnectionFailureException;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

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
    RedisTemplate<String, Object> template;
    @Autowired
    ObjectMapper redisMapper;

    //All course
    void addProcess() {
        String[] processes = new String[]{"course_id", "queue_home", "queue_course", "queue_relative", "queue_route"};
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

    public void cacheCourseId() throws JsonProcessingException {
        Pageable pageable = PageRequest.of(0, 500,
                Sort.by(Sort.Direction.ASC, "id"));
        List<Long> list = dao.getList(pageable).stream().map((v) -> v.getId()).collect(Collectors.toList());
        template.opsForValue().set("course_id", redisMapper.writeValueAsString(list));
        System.out.println("add courseId done");
    }

    public void cacheCourseRelative() {
        Process p = repo.findByName("queue_relative");
        if ((p.getLast_update().getTime() - p.getCreate_at().getTime()) / 1000 >= p.getTimeout())
            p.setStatus(true);
        else p.setStatus(false);
        if (!p.isStatus())
            try {
                List<Category> categories = cateDao.getAllCate();
                ExecutorService executor = Executors.newFixedThreadPool(5);
                for (int i = 0; i < categories.size(); i++) {
                    int temp = i;
                    executor.execute(new Runnable() {
                        @Override
                        public void run() {
                            try {
                                Pageable pageable = PageRequest.of(temp, 20,
                                        Sort.by(Sort.Direction.ASC, "id"));
                                List<Course> list = dao.getList(pageable, categories.get(temp).getId());
                                if (list.size()!=0)
                                System.out.println(template.opsForList().rightPushAll("queue_relative", redisMapper.writeValueAsString(list))); template.opsForList().rightPushAll("queue_relative", redisMapper.writeValueAsString(list));
                                System.out.println("cache course relative done:"+temp);
                                p.setLast_update(new Date());
                                repo.save(p);
                                Thread.sleep(1000);
                            } catch (JsonProcessingException e) {
                                e.printStackTrace();
                            } catch (RedisConnectionFailureException e) {
                                System.out.println("connect fail");
                            } catch (RuntimeException e) {
                                e.printStackTrace();
                                System.out.println("no response");
                            } catch (InterruptedException e) {
                                e.printStackTrace();
                            }
                        }
                    });
                }
            } catch (Exception e) {
                e.printStackTrace();
                System.out.println("No response");
            }
        template.expire("queue_relative",10,TimeUnit.SECONDS);
    }

    public void cacheCourseDetail() {
        try {
            ExecutorService executor = Executors.newFixedThreadPool(5);
            List<Category> categories = cateDao.getAllCate();
            for (int i = 0; i < categories.size(); i++) {
                int temp = i;
                executor.execute(new Runnable() {
                    @Override
                    public void run() {
                        try {
                            Pageable pageable = PageRequest.of(temp, 20,
                                    Sort.by(Sort.Direction.ASC, "id"));
                            List<String> list = dao.getList(pageable, categories.get(temp).getId()).stream().
                                    map((v) -> {
                                                try {
                                                    return redisMapper.writeValueAsString(v);
                                                } catch (JsonProcessingException e) {
                                                    e.printStackTrace();
                                                }
                                                return null;
                                            }
                                    ).collect(Collectors.toList());

                                template.opsForList().rightPushAll("queue_course", list);

                        } catch (RedisConnectionFailureException e) {
                            System.out.println("connect fail");
                        } catch (RuntimeException e) {
                            System.out.println("no response");
                        }
                    }
                });
            }
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("No response");
        }
    }

    public void cacheRoute() {
        Process p = repo.findByName("queue_route");
        if ((p.getLast_update().getTime() - p.getCreate_at().getTime()) / 1000 >= p.getTimeout())
            p.setStatus(true);
        else p.setStatus(false);
        if (!p.isStatus())
            try {
                List<Long> courseId = redisMapper.readValue((String) template.opsForValue().get("course_id"), new TypeReference<List<Long>>() {
                });
                ExecutorService executor = Executors.newFixedThreadPool(5);
                for (int i = 0; i < courseId.size(); i++) {
                    int temp = i;
                    executor.execute(new Runnable() {
                        @Override
                        public void run() {
                            try {
                                Pageable pageable = PageRequest.of(temp, 20,
                                        Sort.by(Sort.Direction.ASC, "id"));
                                List<RouteDto> list = routeDao.getListRout(courseId.get(temp));

                                    template.opsForList().rightPush("queue_course", redisMapper.writeValueAsString(list));
                                p.setLast_update(new Date());
                                repo.save(p);
                                Thread.sleep(1000);
                            } catch (JsonProcessingException e) {
                                e.printStackTrace();
                            } catch (RedisConnectionFailureException e) {
                                System.out.println("connect fail");
                            } catch (RuntimeException e) {
                                System.out.println("no response");
                            } catch (InterruptedException e) {
                                e.printStackTrace();
                            }
                        }
                    });
                }
            } catch (Exception e) {
                e.printStackTrace();
                System.out.println("No response");
            }
    }

    @Scheduled(fixedDelay = 1, timeUnit = TimeUnit.MINUTES)
    void doProcess() throws JsonProcessingException {
        System.out.println("do task");
        addProcess();
        cacheCourseId();
        cacheCourseRelative();
        cacheCourseDetail();
        cacheRoute();
    }

//    public void addHomeQueue() {
//        ExecutorService service = Executors.newFixedThreadPool(5);
//
//        for (Process i : list) {
//            if (!i.isStatus()) {
//                Pageable pageable = PageRequest.of(i.getPage(), 20,
//                        Sort.by(Sort.Direction.ASC, "id"));
//                service.submit(new Runnable() {
//                    @Override
//                    public void run() {
//                        try {
//                            System.out.println(Thread.currentThread().getName());
//                            String key = i.getName();
//                            redis.setValueRedis(key, dao.getList(pageable));
//                            i.setStatus(false);
//                            System.out.println(repo.save(i));
//                            Thread.sleep(1000);
//                        } catch (InterruptedException e) {
//                            e.printStackTrace();
//                        } catch (RedisConnectionFailureException e) {
//                            System.out.println("connect fail");
//                        } catch (JsonProcessingException e) {
//                            e.printStackTrace();
//                        } catch (Exception e) {
//                            System.out.println(e);
//                        }
//                    }
//                });
//            }
//        }
//    }


}
