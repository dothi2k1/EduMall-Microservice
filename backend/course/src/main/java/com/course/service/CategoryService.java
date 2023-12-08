package com.course.service;

import com.course.model.Category;
import org.springframework.http.ResponseEntity;

public interface CategoryService {
    ResponseEntity<?> save(Category category);
    ResponseEntity<?> getAll(int page,String sort);
    ResponseEntity<?> update(Category category);

}
