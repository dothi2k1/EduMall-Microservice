package com.course.service.imp;

import com.course.DTO.RouteDto;
import com.course.dao.DocumentDao;
import com.course.dao.RouteDao;
import com.course.dao.VideoDao;
import com.course.model.Route;
import com.course.model.Video;
import com.course.service.RouteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RouteServiceImp implements RouteService {
    @Autowired
    RouteDao dao;
    @Autowired
    VideoDao videoDao;
    @Autowired
    DocumentDao documentDao;

    //Route -- start
    @Override
    public ResponseEntity<?> addRoutes(Route route) {
        return ResponseEntity.ok(dao.addRoute(route));
    }

    @Override
    public ResponseEntity<?> getAllRoute(long id) {
        return ResponseEntity.ok(dao.getListRout(id));
    }

    @Override
    public ResponseEntity<?> getRouteDetail(long courseId) {
        List<RouteDto> list=dao.getListRout(courseId);
        for (RouteDto i:list){
            i.setDocuments(documentDao.listDocument(i.getId()));
            i.setVideos(videoDao.listVideo(i.getId()));
        }
        return ResponseEntity.ok(list);
    }
    //--end

    //Video and document --start
}
