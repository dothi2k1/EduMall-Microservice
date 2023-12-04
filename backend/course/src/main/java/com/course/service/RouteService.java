package com.course.service;

import com.course.model.Route;
import org.springframework.http.ResponseEntity;

public interface RouteService {
    ResponseEntity<?> addRoutes(Route route);
    ResponseEntity<?> getAllRoute(long courseId);
}
