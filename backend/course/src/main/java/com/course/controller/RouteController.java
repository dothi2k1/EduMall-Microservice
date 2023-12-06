package com.course.controller;

import com.course.model.Route;
import com.course.service.imp.RouteServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/sv2/route")
public class RouteController {
    @Autowired
    RouteServiceImp service;
    //route-start
    @PostMapping("add-route")
    ResponseEntity<?> add(@RequestBody Route route){
        return service.addRoutes(route);
    }

    @GetMapping("get-list-route")
    ResponseEntity<?> getListRoute(@RequestParam long id){
        return service.getAllRoute(id);
    }


    //--end

}
