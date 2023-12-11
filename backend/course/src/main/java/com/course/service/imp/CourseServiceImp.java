package com.course.service.imp;

import com.course.DTO.CourseDTo;
import com.course.DTO.CourseResponse;
import com.course.DTO.RouteDto;
import com.course.dao.CourseDao;
import com.course.dao.RouteDao;
import com.course.model.Course;
import com.course.model.Process;
import com.course.model.Route;
import com.course.repository.ProcessRepo;
import com.course.schedule.ScheduleService;
import com.course.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseServiceImp implements CourseService {
    @Autowired
    CourseDao dao;
    @Autowired
    RouteDao routeDao;
    @Autowired
    RedisServiceImp redis;
    @Autowired
    ProcessRepo repo;
    @Autowired
    ScheduleService scdsv;
    //course -- start
    @Override
    public ResponseEntity<?> getAll(int page, String sort) throws Exception {
        Pageable pageable= PageRequest.of(page,10,
                Sort.by(Sort.Direction.ASC,sort));
        ResponseEntity<?> entity=redis.getAllCourse(page);
        if (entity!=null) {
            return entity;
        }
        List<Course> list= dao.getList(pageable);
        return ResponseEntity.ok(list);
    }

    @Override
    public ResponseEntity<?> getListCourse(int page, String sort) {
        Pageable pageable= PageRequest.of(page,10,
                Sort.by(Sort.Direction.ASC,sort));
        return ResponseEntity.ok(dao.listCourseDto(pageable));
    }

    @Override
    public ResponseEntity<?> save(Course course) {
        long id=0;
        id= dao.save(course);
        if (id!=0)
            return ResponseEntity.ok(id);
        return ResponseEntity.status(400).body("Create fail");
    }

    @Override
    public ResponseEntity<?> findCourseById(Long id) {
        ResponseEntity<?> course=redis.getCourseById(id);
        if (course!=null) return course;
        Pageable pageable= PageRequest.of(0,10,
                Sort.by(Sort.Direction.ASC,"id"));
        CourseDTo courseDTo=dao.findCourseById(id);
        List<RouteDto> routes=routeDao.getListRout(id);
        CourseResponse courseResponse=new CourseResponse();
        courseResponse.setRelative(dao.getListRelative(pageable,courseDTo.getCate(), courseDTo.getId()));
        courseResponse.setRoutes(routes);
        return ResponseEntity.ok(courseResponse);
    }

    @Override
    public ResponseEntity<?> activeCourse(long id, boolean status) {
        return ResponseEntity.ok(dao.active(id,status));
    }


    //--end


}
