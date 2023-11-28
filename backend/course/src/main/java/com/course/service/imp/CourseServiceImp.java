package com.course.service.imp;

import com.course.dao.CourseDao;
import com.course.model.Course;
import com.course.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class CourseServiceImp implements CourseService {
    @Autowired
    CourseDao dao;
    @Override
    public ResponseEntity<?> getAll(int page, String sort) {
        Pageable pageable= PageRequest.of(page,20,
                Sort.by(Sort.Direction.ASC,sort));
        return ResponseEntity.ok(dao.getList(pageable));
    }

    @Override
    public ResponseEntity<?> save(Course course) {
        return null;
    }

    @Override
    public ResponseEntity<?> findById(Long id) {
        return null;
    }
}
