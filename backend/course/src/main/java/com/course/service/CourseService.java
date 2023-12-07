package com.course.service;


import com.course.model.Course;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.http.ResponseEntity;


public interface CourseService {
    ResponseEntity<?> getAll(int page, String sort) throws Exception;
    ResponseEntity<?> getListCourse(int page, String sort);
    ResponseEntity<?> save(Course course);
    ResponseEntity<?> findCourseById(Long id);
    ResponseEntity<?> activeCourse(long id,boolean status);

}
