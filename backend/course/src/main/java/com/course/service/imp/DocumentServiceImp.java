package com.course.service.imp;

import com.course.dao.DocumentDao;
import com.course.model.Document;
import com.course.service.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;
@Service
public class DocumentServiceImp implements DocumentService {

    @Autowired
    DocumentDao dao;
    @Override
    public ResponseEntity<?> getDocument(long routeId) {
        return ResponseEntity.ok(dao.listDocument(routeId));
    }

    @Override
    public ResponseEntity<?> addDoc(Document document) {
        document.setCreate_at(new Date());
        document.setStatus(true);
        long rs=0;
        rs=dao.addDocument(document);
        if (rs!=0) return ResponseEntity.ok(rs);
        return ResponseEntity.status(400).body("Can't add video. Try again!");
    }
}
