package com.course.service.imp;

import com.course.DTO.CourseDTo;
import com.course.DTO.CourseResponse;
import com.course.dao.CourseDao;
import com.course.model.Course;
import com.course.model.Route;
import com.course.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
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
    @Override
    public ResponseEntity<?> getAll(int page, String sort) {
        Pageable pageable= PageRequest.of(page,20,
                Sort.by(Sort.Direction.ASC,sort));
        return ResponseEntity.ok(dao.getList(pageable));
    }

    @Override
    public ResponseEntity<?> getListCourse(int page, String sort) {
        Pageable pageable= PageRequest.of(page,20,
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
        CourseDTo courseDTo=dao.findCourseById(id);
        List<Route> routes=dao.getListRout(id);
        CourseResponse courseResponse=new CourseResponse();
        courseResponse.setCourseDTo(courseDTo);
        courseResponse.setRoutes(routes);
        return ResponseEntity.ok(courseResponse);
    }

    @Override
    public ResponseEntity<?> addRoutes(Route route) {
        return ResponseEntity.ok(dao.addRoute(route));
    }

    @Override
    public ResponseEntity<?> getAllRoute(long id) {
        return ResponseEntity.ok(dao.getListRout(id));
    }

    @Override
    public ResponseEntity<?> getVideo(long routeId) {
        return ResponseEntity.ok(dao.listVideo(routeId));
    }

    @Override
    public ResponseEntity<?> getDocument(long routeId) {
        return ResponseEntity.ok(dao.listDocument(routeId));
    }
}
