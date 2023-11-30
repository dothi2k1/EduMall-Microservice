package com.course.dao;

import com.course.model.Route;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.stereotype.Component;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;

@Component
public class RouteDao {
    private final JdbcTemplate jdbcTemplate;
    GeneratedKeyHolder holder=new GeneratedKeyHolder();
    public RouteDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    RowMapper<Route> rmap = ((rs, rowNum) -> {
        Route route = new Route();
        route.setId(rs.getLong("id"));
        route.setCourse_id(rs.getLong(2));
        route.setOrder(rs.getInt(3));
        route.setTitle(rs.getString(4));
        route.setContent(rs.getString(5));
        return route;
    });
    // add route of a course
    public Long addRoute(Route route) {
        String rs = "";
        String query = "insert into route(courseid,orders,title,content)" +
                " values (?,?,?,?)";
        jdbcTemplate.update(
                new PreparedStatementCreator() {
                    @Override
                    public PreparedStatement createPreparedStatement(Connection con) throws SQLException {
                        PreparedStatement statement = con.prepareStatement(query, Statement.RETURN_GENERATED_KEYS);
                        statement.setLong(1, route.getCourse_id());
                        statement.setInt(2, route.getOrder());
                        statement.setString(3, route.getTitle());
                        statement.setString(4, route.getContent());
                        return statement;
                    }
                }, holder);
        Long c = holder.getKey().longValue();
        return c;
    }
    // get list route of a course
    public List<Route> getListRout(long id) {
        String query = "SELECT * FROM route where courseid=" + id;
        return jdbcTemplate.query(query, rmap);
    }
}
