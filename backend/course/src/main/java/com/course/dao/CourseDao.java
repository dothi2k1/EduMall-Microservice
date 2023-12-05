package com.course.dao;

import com.course.DTO.CourseDTo;
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
public class CourseDao {

    private final JdbcTemplate jdbcTemplate;
    //holder for get id after safe
    GeneratedKeyHolder holder = new GeneratedKeyHolder();
    //Course mapper
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
        course.setTitle(rs.getString(12));
        return course;
    });
    //route mapper

    //courseDTO mapper
    RowMapper<CourseDTo> courseDTO = ((rs, rowNum) -> {
        CourseDTo courseDTo = new CourseDTo();
        courseDTo.setId(rs.getLong("id"));
        courseDTo.setUsername(rs.getString("username"));
        courseDTo.setDescription(rs.getString("description"));
        courseDTo.setTitle(rs.getString("title"));
        courseDTo.setPrice(rs.getDouble("price"));
        courseDTo.setEstimate(rs.getDouble("estimate"));
        courseDTo.setCate(rs.getInt("cate"));
        return courseDTo;
    });

    RowMapper<Integer> count = ((rs, rowNum) -> {
        Integer count=(rs.getInt(1));
        return count;
    });
    public CourseDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    //get list for teacher management
    public List<Course> getList(Pageable pageable) {
        String query = "SELECT * FROM course LIMIT " +
                pageable.getPageSize() +
                " OFFSET " + pageable.getOffset();
        return jdbcTemplate.query(query, mapper);

    }
    //get list course by category
    public List<Course> getList(Pageable pageable,long category) {
        String query = "SELECT * FROM course where cate="+category+" LIMIT " +
                pageable.getPageSize() +
                " OFFSET " + pageable.getOffset();
        return jdbcTemplate.query(query, mapper);

    }

    //get list for preview
    public List<CourseDTo> listCourseDto(Pageable pageable) {
        String query = "SELECT c.id,u.username,c.title,c.description,c.price,c.estimate " +
                "FROM course c,users u where c.uid=u.id LIMIT " +
                pageable.getPageSize() +
                " OFFSET " + pageable.getOffset();
        return jdbcTemplate.query(query, courseDTO);

    }
    //teacher create course
    public Long save(Course course) {
        String rs = "";
        String query = "insert into course(type,uid,cate,description," +
                "createat,updateat,deleteat,active,price,estimate,title)" +
                " values (?,?,?,?,?,?,?,?,?,?,?)";
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
                        statement.setString(11, course.getTitle());
                        return statement;
                    }
                }, holder);
        Long c = holder.getKey().longValue();
        return c;
    }
    //teacher update
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
    // teacher update status
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

    //get course by id
    public CourseDTo findCourseById(long id){
        String qr="SELECT c.id,u.username,c.title,c.description,c.price,c.estimate c.cate" +
                "FROM course c,users u where c.uid=u.id and c.id="+id;
        CourseDTo courseDTo=jdbcTemplate.queryForObject(qr, courseDTO);
        return courseDTo;
    }

    //get total page
    public int getTotalPage(){
        String qr="select count(id) from course";
        int c= jdbcTemplate.queryForObject(qr,Integer.class);
        return c;
    }

    //get total page by cate
    public int getTotalPageByCate(long cate){
        String qr="select count(id) from course where cate="+cate;
        int c= jdbcTemplate.queryForObject(qr,Integer.class);
        return c;
    }
}
