package com.course.service.imp;

import com.course.DTO.CourseDTo;
import com.course.DTO.CourseResponse;
import com.course.DTO.CourseSummary;
import com.course.DTO.RouteDto;
import com.course.dao.CourseDao;
import com.course.dao.DocumentDao;
import com.course.dao.RouteDao;
import com.course.dao.VideoDao;
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

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

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
    @Autowired
    VideoDao videoDao;
    @Autowired
    DocumentDao documentDao;
    //course -- start
    @Override
    public ResponseEntity<?> getAll(int page, String sort) {
        Pageable pageable= PageRequest.of(page,10);
        ResponseEntity<?> entity=redis.getAllCourse(page);
        if (entity!=null) {
            return entity;
        }
        List<CourseSummary> list= dao.getAll(pageable,sort);
        return ResponseEntity.ok(list);
    }

    @Override
    public ResponseEntity<?> getListCourse(int page, String sort) {
        Pageable pageable= PageRequest.of(page,10);
        return ResponseEntity.ok(dao.listCourseDto(pageable,sort));
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
        courseDTo.setDoc(documentDao.countByCourseId(id));
        courseDTo.setVideos(videoDao.countByCourseId(id));
        List<RouteDto> routes=routeDao.getListRout(id);
        CourseResponse courseResponse=new CourseResponse();
        courseResponse.setCourse(courseDTo);
        courseResponse.setRelative(dao.getListRelative(pageable,courseDTo.getCate(), id));
        courseResponse.setRoutes(routes);
        return ResponseEntity.ok(courseResponse);
    }

    @Override
    public ResponseEntity<?> activeCourse(long id, boolean status) {
        return ResponseEntity.ok(dao.active(id,status));
    }

    @Override
    public ResponseEntity<?> seeCartImage(long[] courseId) {
        return ResponseEntity.ok(dao.seeCartImage(Arrays.stream(courseId).boxed().collect(Collectors.toList())));
    }


    //--end


}
