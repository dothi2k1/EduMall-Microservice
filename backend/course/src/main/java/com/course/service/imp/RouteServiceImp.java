package com.course.service.imp;

import com.course.dao.RouteDao;
import com.course.model.Route;
import com.course.service.RouteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class RouteServiceImp implements RouteService {
    @Autowired
    RouteDao dao;
    //Route -- start
    @Override
    public ResponseEntity<?> addRoutes(Route route) {
        return ResponseEntity.ok(dao.addRoute(route));
    }

    @Override
    public ResponseEntity<?> getAllRoute(long id) {
        return ResponseEntity.ok(dao.getListRout(id));
    }
    //--end

    //Video and document --start
}
