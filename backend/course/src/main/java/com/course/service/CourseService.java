package com.course.service;

import com.course.model.Course;
import com.course.model.Route;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;


public interface CourseService {
    ResponseEntity<?> getAll(int page, String sort);
    ResponseEntity<?> getListCourse(int page, String sort);
    ResponseEntity<?> save(Course course);
    ResponseEntity<?> findCourseById(Long id);
    ResponseEntity<?> addRoutes(Route route);
    ResponseEntity<?> getAllRoute(long courseId);
    ResponseEntity<?> getVideo(long routeId);
    ResponseEntity<?> getDocument(long routeId);
}
