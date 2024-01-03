package com.course.controller;

import com.course.model.Route;
import com.course.service.imp.RouteServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/sv2")
public class RouteController {
    @Autowired
    RouteServiceImp service;
    //route-start
    @PostMapping("private/route/add-route")
    ResponseEntity<?> add(@RequestBody Route route){
        return service.addRoutes(route);
    }

    @GetMapping("/route/get-list-route")
    ResponseEntity<?> getListRoute(@RequestParam long id){
        return service.getAllRoute(id);
    }
    @GetMapping("/route/get-list-route-detail")
    ResponseEntity<?> getListCourseDetail(@RequestParam long id){
        return service.getRouteDetail(id);
    }
    //--end

}
