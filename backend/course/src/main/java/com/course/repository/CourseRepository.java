package com.course.repository;

import com.course.model.Course;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CourseRepository {
    @Autowired
    JdbcTemplate jdbcTemplate;

    List<Course> getList(Pageable pageable){
        String query="SELECT * FROM courses LIMIT "+pageable.getPageSize()+" OFFSET "+pageable.getOffset();
        List<Course> courses=jdbcTemplate.queryForList(query,Course.class);
        return  courses;
    }
}
