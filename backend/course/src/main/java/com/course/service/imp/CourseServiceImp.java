package com.course.service.imp;

import com.course.DTO.CourseDTo;
import com.course.DTO.CourseResponse;
import com.course.dao.CourseDao;
import com.course.dao.RouteDao;
import com.course.model.Course;
import com.course.model.Document;
import com.course.model.Route;
import com.course.model.Video;
import com.course.service.CourseService;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@EnableCaching
public class CourseServiceImp implements CourseService {
    @Autowired
    CourseDao dao;
    @Autowired
    RouteDao routeDao;
    @Autowired
    RedisServiceImp redis;
    //course -- start
    @Override
    public ResponseEntity<?> getAll(int page, String sort) throws Exception {
        Pageable pageable= PageRequest.of(page,20,
                Sort.by(Sort.Direction.ASC,sort));
        ResponseEntity<?> entity=redis.getAllCourse(page,sort);
        if (entity!=null) {
            return entity;
        }
        List<Course> list= dao.getList(pageable);
//        redis.addAllCourseToRedis(list,page);
        return ResponseEntity.ok(list);
    }

    @Override
    public ResponseEntity<?> getListCourse(int page, String sort) {
        Pageable pageable= PageRequest.of(page,20,
                Sort.by(Sort.Direction.ASC,sort));
        return ResponseEntity.ok(dao.listCourseDto(pageable));
    }

    @Override
    @CacheEvict(value = "id",key = "#course.id")
    public ResponseEntity<?> save(Course course) {
        long id=0;
        id= dao.save(course);
        if (id!=0)
            return ResponseEntity.ok(id);
        return ResponseEntity.status(400).body("Create fail");
    }

    @Override
    public ResponseEntity<?> findCourseById(Long id) {
        CourseDTo courseDTo=dao.findCourseById(id);
        List<Route> routes=routeDao.getListRout(id);
        CourseResponse courseResponse=new CourseResponse();
        courseResponse.setCourseDTo(courseDTo);
        courseResponse.setRoutes(routes);
        return ResponseEntity.ok(courseResponse);
    }

    @Override
    public ResponseEntity<?> activeCourse(long id, boolean status) {
        return ResponseEntity.ok(dao.active(id,status));
    }


    //--end

    private void doLongRunningTask(){
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

}
