package com.course.controller;

import com.course.model.Document;
import com.course.service.imp.DocumentServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

public class DocController {
    @Autowired
    DocumentServiceImp service;
    @PostMapping("add-doc")
    ResponseEntity<?> addDocument(@RequestBody Document document){
        return service.addDoc(document);
    }

    @GetMapping("get-list-document")
    ResponseEntity<?> getListDocument(@RequestParam long id){
        return service.getDocument(id);
    }

}
