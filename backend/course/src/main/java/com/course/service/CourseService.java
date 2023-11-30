package com.course.service;


import com.course.model.Course;
import org.springframework.http.ResponseEntity;


public interface CourseService {
    ResponseEntity<?> getAll(int page, String sort);
    ResponseEntity<?> getListCourse(int page, String sort);
    ResponseEntity<?> save(Course course);
    ResponseEntity<?> findCourseById(Long id);
    ResponseEntity<?> activeCourse(long id,boolean status);

}
