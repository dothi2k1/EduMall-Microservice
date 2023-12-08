package com.course.dao;

import com.course.model.Category;
import com.course.model.Course;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.stereotype.Component;

import java.sql.*;
import java.util.List;

@Component
public class CategoryDao {

    private final JdbcTemplate jdbcTemplate;
    //holder for get id after save
    GeneratedKeyHolder holder = new GeneratedKeyHolder();

    //route mapper

    //category mapper
    RowMapper<Category> cateMapper  = ((rs, rowNum) -> {
        Category category = new Category();
        category.setId(rs.getLong("id"));
        category.setName(rs.getString("name"));
        category.setDescription(rs.getString("description"));
        category.setCreateAt(rs.getDate("create_at"));
        category.setDeleteAt(rs.getDate("delete_at"));
        category.setUpdateAt(rs.getDate("update_at"));
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
    public Long save(Category category) {
        String rs = "";
        String query = "insert into category(name,description,create_at,uopdate_at,delete_at,status)" +
                " values (?,?,?,?,?,?)";
        jdbcTemplate.update(
                new PreparedStatementCreator() {
                    @Override
                    public PreparedStatement createPreparedStatement(Connection con) throws SQLException {
                        PreparedStatement statement = con.prepareStatement(query, Statement.RETURN_GENERATED_KEYS);
                        statement.setString(1, category.getName());
                        statement.setString(2, category.getDescription());
                        statement.setDate(3, (Date) category.getCreateAt());
                        statement.setDate(4, (Date) category.getUpdateAt());
                        statement.setDate(5, (Date) category.getDeleteAt());
                        statement.setBoolean(6, category.isStatus());
                        return statement;
                    }
                }, holder);
        Long c = holder.getKey().longValue();
        return c;
    }
}
