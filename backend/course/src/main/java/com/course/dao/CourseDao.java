package com.course.dao;

import com.course.DTO.CartImage;
import com.course.DTO.CourseDTo;
import com.course.DTO.CourseSummary;
import com.course.model.Course;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.stereotype.Component;

import java.sql.*;
import java.util.List;
import java.util.Stack;
import java.util.stream.Collectors;


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
        course.setUid(rs.getInt("uid"));
        course.setCate(rs.getInt("cate"));
        course.setDescription(rs.getString("description"));
        course.setCreateat(rs.getDate("createat"));
        course.setUpdateat(rs.getDate("updateat"));
        course.setDeleteat(rs.getDate("deleteat"));
        course.setActive(rs.getBoolean("active"));
        course.setPrice(rs.getDouble("price"));
        course.setEstimate(rs.getDouble("estimate"));
        course.setTitle(rs.getString("title"));
        course.setImage(rs.getString("image"));
        course.setRate(rs.getDouble("rate"));
        course.setRegis(rs.getLong("regis"));
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
        courseDTo.setRegis(rs.getLong("regis"));
        courseDTo.setRate(rs.getDouble("rate"));
        courseDTo.setImage(rs.getString("image"));
        courseDTo.setUpdateat(rs.getDate("updateat"));
        courseDTo.setRoutes(rs.getInt("routes"));
        return courseDTo;
    });
    //
    RowMapper<CourseSummary> summary = ((rs, rowNum) -> {
        CourseSummary sum = new CourseSummary();
        sum.setId(rs.getLong("id"));
        sum.setUsername(rs.getString("username"));
        sum.setTitle(rs.getString("title"));
        sum.setPrice(rs.getDouble("price"));
        sum.setEstimate(rs.getDouble("estimate"));
        sum.setCate(rs.getInt("cate"));
        sum.setImage(rs.getString("image"));
        sum.setUpdateat(rs.getDate("updateat"));
        sum.setRate(rs.getDouble("rate"));
        sum.setRegis(rs.getLong("regis"));
        return sum;
    });

    RowMapper<Integer> count = ((rs, rowNum) -> {
        Integer count = (rs.getInt(1));
        return count;
    });

    public CourseDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    //get list for teacher management
    public List<Course> getList(Pageable pageable, String sort) {
        String query = "SELECT * FROM course " + " ORDER BY " + sort + " LIMIT " +
                pageable.getPageSize() +
                " OFFSET " + pageable.getOffset();
        return jdbcTemplate.query(query, mapper);

    }

    public List<CourseSummary> getAll(Pageable pageable, String sort) {
        String query = "SELECT c.id,u.username,c.title,c.price,c.estimate, c.cate,c.image,c.updateat,c.rate,c.regis FROM course c,users u " +
                "where c.uid=u.id"+ " ORDER BY c." + sort + " LIMIT " +
                pageable.getPageSize() +
                " OFFSET " + pageable.getOffset();
        return jdbcTemplate.query(query, summary);

    }
    public List<CourseSummary> getAll(){
        String query="SELECT c.id,u.username,c.title,c.price,c.estimate, c.cate,c.image,c.updateat,c.rate,c.regis FROM course c,users u " +
                "where c.uid=u.id";
        return  jdbcTemplate.query(query,summary);
    }
    //get list course by category
    public List<Course> getList(Pageable pageable, long category) {
        String query = "SELECT * FROM course where cate=" + category + " LIMIT " +
                pageable.getPageSize() +
                " OFFSET " + pageable.getOffset();
        return jdbcTemplate.query(query, mapper);

    }

    public List<Course> getListRelative(Pageable pageable, long category, long id) {
        String query = "SELECT * FROM course where cate=" + category + " AND id <>" + id + " LIMIT " +
                pageable.getPageSize() +
                " OFFSET " + pageable.getOffset();
        return jdbcTemplate.query(query, mapper);

    }

    //get list for preview
    public List<CourseDTo> listCourseDto(Pageable pageable, String sort) {
        String query = "select c.id,u.username,c.title,c.description,c.price,c.estimate,c.regis, c.cate,c.rate,c.image,c.updateat ,count(r.id) as routes " +
                "from course c,route r, users u " +
                "where c.id=r.courseid and r.id=d.routeid and u.id=c.uid group by c.id"
                + " ORDER BY c." + sort + " LIMIT "
                + pageable.getPageSize()
                + " OFFSET " + pageable.getOffset();

        return jdbcTemplate.query(query, courseDTO);

    }

    //teacher create course
    public Long save(Course course) {
        String rs = "";
        String query = "insert into course(type,uid,cate,description," +
                "createat,updateat,deleteat,active,price,estimate,title,image,rate,regis)" +
                " values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
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
                        statement.setString(12,course.getImage());
                        statement.setDouble(13,course.getRate());
                        statement.setLong(14,course.getRegis());
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
    public String updateRate(Course course) {
        String rs = "";
        String query = "update course set " +
                "rate=? " +
                "where id=?";
        int c = jdbcTemplate.update(query,
                course.getRate()
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
    public CourseDTo findCourseById(long id) {
        String qr = "select  c.id,u.username,c.title,c.description,c.price,c.image,c.estimate,c.rate, c.cate,c.regis,c.updateat,count(r.id) as routes"+
        " from course c,route r, users u"+
        " where c.uid=u.id and c.id=r.courseid and c.id=" + id;
        CourseDTo courseDTo = jdbcTemplate.queryForObject(qr, courseDTO);
        return courseDTo;
    }

    //get total page
    public long getTotalPage() {
        String qr = "select count(id) from course where id not in (1)";
        long c = jdbcTemplate.queryForObject(qr, Integer.class);
        return c;
    }

    //get total page by cate
    public long getTotalPageByCate(long cate) {
        String qr = "select count(id) from course where cate=" + cate;
        long c = jdbcTemplate.queryForObject(qr, Integer.class);
        return c;
    }

    public List<CartImage> seeCartImage(List<Long> courseId){
        String ids=String.join(",",courseId.stream().map(String::valueOf).collect(Collectors.toList()));
        String qr="select id,image,title from course where id in ("+ids+") ";
        List<CartImage> list=jdbcTemplate.query(qr, new RowMapper<CartImage>() {
            @Override
            public CartImage mapRow(ResultSet rs, int rowNum) throws SQLException {
                CartImage cartImage=new CartImage();
                cartImage.setId(rs.getLong("id"));
                cartImage.setTitle(rs.getString("title"));
                cartImage.setImage(rs.getString("image"));
                return cartImage;
            }
        });
        return list;
    }
}
