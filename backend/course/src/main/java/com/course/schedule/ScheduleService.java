package com.course.schedule;

import com.course.dao.CourseDao;
import com.course.model.Process;
import com.course.repository.ProcessRepo;
import com.course.service.imp.RedisServiceImp;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.redis.RedisConnectionFailureException;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.concurrent.*;

@Component
public class ScheduleService {
    @Autowired
    ProcessRepo repo;
    @Autowired
    CourseDao dao;
    @Autowired
    RedisServiceImp redis;

    void addProcess(){
        System.out.println("add process");
        repo.deleteAll();
        int count= (dao.getTotalPage()%20==0)? dao.getTotalPage()/20 : dao.getTotalPage()/20+1;
        for (int i = 0; i < count; i++) {
            Process process=new Process();
            process.setName(("course"+(i)));
            process.setStatus(false);
            process.setPage(i);
            repo.save(process);
        }
    }
    public List<Process> getProcesses() {
        return repo.findAll();
    }

    @Scheduled(fixedDelay = 3,timeUnit = TimeUnit.MINUTES)
    void doProcess() throws ExecutionException, InterruptedException {
        System.out.println("do task");
        redis.clear();
        addProcess();
        addCourseToRedis();
    }
    public void addCourseToRedis()  {
        ExecutorService service = Executors.newFixedThreadPool(5);
        List<Process> list = getProcesses();
        for (Process i : list) {
            if (!i.isStatus()) {
                Pageable pageable = PageRequest.of((int) i.getPage(), 20,
                        Sort.by(Sort.Direction.ASC, "id"));
                        service.submit(new Runnable() {
                            @Override
                            public void run() {
                                try {
                                    System.out.println(Thread.currentThread().getName());
                                    String key=i.getName();
                                    redis.setValueRedis(key,dao.getList(pageable));
                                    i.setStatus(false);
                                    System.out.println(repo.save(i));
                                    Thread.sleep(1000);
                                } catch (InterruptedException e) {
                                    e.printStackTrace();
                                }
                                catch (RedisConnectionFailureException e){
                                    System.out.println("connect fail");
                                } catch (JsonProcessingException e) {
                                    e.printStackTrace();
                                }
                                catch (Exception e){
                                    System.out.println(e);
                                }
                            }
                        });
            }
        }
    }

}
