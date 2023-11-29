package com.course.service;

import com.course.DTO.VideoDto;
import com.course.model.Course;
import com.course.model.Document;
import com.course.model.Route;
import com.course.model.Video;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;


public interface CourseService {
    ResponseEntity<?> getAll(int page, String sort);
    ResponseEntity<?> getListCourse(int page, String sort);
    ResponseEntity<?> save(Course course);
    ResponseEntity<?> findCourseById(Long id);
    ResponseEntity<?> activeCourse(long id,boolean status);
    ResponseEntity<?> addRoutes(Route route);
    ResponseEntity<?> getAllRoute(long courseId);
    ResponseEntity<?> getVideo(long routeId);
    ResponseEntity<?> addVideo(Video video);
    ResponseEntity<?> getDocument(long routeId);
    ResponseEntity<?> addDoc(Document document);
}
