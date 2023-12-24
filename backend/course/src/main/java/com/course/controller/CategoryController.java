package com.course.controller;

import com.course.model.Category;
import com.course.service.imp.CategoryServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/sv2")
public class CategoryController {
    @Autowired
    CategoryServiceImp service;
    @PostMapping("/private/category/add-cate")
    ResponseEntity<?> save(@RequestBody Category category){
        return service.save(category);
    }
    @GetMapping("/category/get-all")
    ResponseEntity<?> getAll(@RequestParam int page,@RequestParam(defaultValue = "") String name){
        return service.getAll(page,name);
    }
}
