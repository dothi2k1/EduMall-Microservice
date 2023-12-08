package com.course.controller;

import com.course.model.Category;
import com.course.service.imp.CategoryServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureOrder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/sv2/category")
public class CategoryController {
    @Autowired
    CategoryServiceImp service;
    @PostMapping("/private/category/add-cate")
    ResponseEntity<?> save(@RequestBody Category category){
        return service.save(category);
    }
}
