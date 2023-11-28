package com.course.dao;

import com.course.model.Course;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.stereotype.Component;

import java.sql.*;
import java.util.List;


@Component
public class CourseDao {

    private final JdbcTemplate jdbcTemplate;
    GeneratedKeyHolder holder = new GeneratedKeyHolder();

    RowMapper<Course> mapper = ((rs, rowNum) -> {
        Course course = new Course();
        course.setId(rs.getLong("id"));
        course.setType(rs.getInt("type"));
        course.setUid(rs.getInt(3));
        course.setCate(rs.getInt(4));
        course.setDescription(rs.getString(5));
        course.setCreateat(rs.getDate(6));
        course.setUpdateat(rs.getDate(7));
        course.setDeleteat(rs.getDate(8));
        course.setActive(rs.getBoolean(9));
        course.setPrice(rs.getDouble(10));
        course.setEstimate(rs.getDouble(11));
        return course;
    });

    public CourseDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Course> getList(Pageable pageable) {
        String query = "SELECT * FROM course LIMIT " +
                pageable.getPageSize() +
                " OFFSET " + pageable.getOffset();
        return jdbcTemplate.query(query, mapper);

    }

    public Long save(Course course) {
        String rs = "";
        String query = "insert into course(type,uid,cate,description," +
                "createat,updateat,deleteat,active,price,estimate)" +
                " values (?,?,?,?,?,?,?,?,?,?)";
        jdbcTemplate.update(
                new PreparedStatementCreator() {
                    @Override
                    public PreparedStatement createPreparedStatement(Connection con) throws SQLException {
                        PreparedStatement statement = con.prepareStatement(query, Statement.RETURN_GENERATED_KEYS);
                        statement.setInt(1, course.getType());
                        statement.setInt(2, course.getUid());
                        statement.setInt(3, course.getCate());
                        statement.setString(4, course.getDescription());
                        statement.setDate(5, (Date) course.getCreateat());
                        statement.setDate(6, (Date) course.getUpdateat());
                        statement.setDate(7, (Date) course.getDeleteat());
                        statement.setDouble(8, course.getPrice());
                        statement.setBoolean(9, course.isActive());
                        statement.setDouble(10, course.getEstimate());
                        return statement;
                    }
                }, holder);
        Long c=holder.getKey().longValue();
        return c;
    }

    public String update(Course course) {
        String rs = "";
        String query = "update course set " +
                "type =?, cate=?, description=?, updateat=?, price=?, estimate=? " +
                "where id=?";
        int c = jdbcTemplate.update(query,
                course.getType(), course.getCate(),
                course.getDescription(), course.getUpdateat(),
                course.getPrice(), course.getEstimate(), course.getId()
        );
        if (c == 1) rs += "Update success";
        return rs;
    }

    public String active(Long id, boolean status) {
        String rs = "";
        String query = "update course set " +
                "active=? " +
                "where id=?";
        int c = jdbcTemplate.update(query, status, id);
        if (c == 1) {
            if (status == true)
                rs = "Active success";
            else rs = "Temporarily closed";
        }
        return rs;
    }
}
