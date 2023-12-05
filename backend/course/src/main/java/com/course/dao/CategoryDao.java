package com.course.dao;

import com.course.model.Category;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CategoryDao {

    private final JdbcTemplate jdbcTemplate;
    //holder for get id after safe
    GeneratedKeyHolder holder = new GeneratedKeyHolder();

    //route mapper

    //category mapper
    RowMapper<Category> cateMapper  = ((rs, rowNum) -> {
        Category category = new Category();
        category.setId(rs.getLong("id"));
        category.setName(rs.getString("name"));
        category.setDescription(rs.getString("description"));
        category.setCreateAt(rs.getDate("createat"));
        category.setDeleteAt(rs.getDate("deleteat"));
        category.setUpdateAt(rs.getDate("updateat"));
        category.setStatus(rs.getBoolean("status"));
        return category;
    });

    public CategoryDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Category> getAllCate(){
        String query = "SELECT * FROM category";
        return jdbcTemplate.query(query, cateMapper);
    }

}
