package com.course.service;

import com.course.model.Course;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;


public interface CourseService {
    ResponseEntity<?> getAll(int page, String sort);
    ResponseEntity<?> save(Course course);
    ResponseEntity<?> findById(Long id);
}
