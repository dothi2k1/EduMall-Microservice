package com.course.service;

import com.course.model.Document;
import org.springframework.http.ResponseEntity;

public interface DocumentService {
    ResponseEntity<?> getDocument(long routeId);
    ResponseEntity<?> addDoc(Document document);
}
