package com.course.dao;

import com.course.model.Course;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public class CourseDao {

    private final JdbcTemplate jdbcTemplate;
    RowMapper<Course> mapper=((rs, rowNum) -> {
        Course course=new Course();
        course.setId(rs.getLong("id"));
        course.setType(rs.getInt("type"));
        course.setUid(rs.getInt(3));
        course.setCate(rs.getInt(4));
        course.setDescription(rs.getString(5));
        course.setCreateat(rs.getDate(6));
        course.setCreateby(rs.getLong(7));
        course.setUpdateat(rs.getDate(8));
        course.setDeleteat(rs.getDate(9));
        course.setActive(rs.getBoolean(10));
        course.setPrice(rs.getDouble(11));
        course.setEstimate(rs.getDouble(12));
        return  course;
    });

    public CourseDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Course> getList(Pageable pageable){
        String query="SELECT * FROM course LIMIT "+
                pageable.getPageSize()+
                " OFFSET "+pageable.getOffset();
        return  jdbcTemplate.query(query,mapper);

    }

    public String save(Course course){
        String rs="";
        String query="insert into course(type,uid,cate,description," +
                "createat,createby,updateat,deleteat,active,price,estimate)" +
                " values (?,?,?,?,?,?,?,?,?,?,?)";
        int c= jdbcTemplate.update(query,
                course.getType(),course.getUid(),course.getCate(),
                course.getDescription(),course.getCreateat(),
                course.getCreateby(),course.getUpdateat(),
                course.getDeleteat(),course.getPrice(),
                course.isActive(),course.getEstimate()
        );
        if (c==1) rs+="create success";
        return rs;
    }
}
