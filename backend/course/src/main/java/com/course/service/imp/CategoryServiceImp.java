package com.course.service.imp;

import com.course.dao.CategoryDao;
import com.course.model.Category;
import com.course.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class CategoryServiceImp implements CategoryService {
    @Autowired
    CategoryDao dao;
    @Override
    public ResponseEntity<?> save(Category category) {
        long c=dao.save(category);
        if (c!=0) return ResponseEntity.ok("Create success");
        return ResponseEntity.status(400).body("create fail");
    }

    @Override
    public ResponseEntity<?> getAll(int page, String sort) {
        return ResponseEntity.ok(dao.getAllCate());
    }

    @Override
    public ResponseEntity<?> update(Category category) {
        return null;
    }
}
