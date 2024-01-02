package com.course.dao;

import com.course.DTO.VideoDto;
import com.course.model.Video;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.stereotype.Component;

import java.sql.*;
import java.util.List;

@Component
public class VideoDao {
    private final JdbcTemplate jdbcTemplate;
    GeneratedKeyHolder holder=new GeneratedKeyHolder();
    public VideoDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    //add video
    public Long addVideo(Video video){
        String rs = "";
        String query = "insert into video(routeid,link,title,createat,updateat,status)" +
                " values (?,?,?,?,?,?)";
        jdbcTemplate.update(
                new PreparedStatementCreator() {
                    @Override
                    public PreparedStatement createPreparedStatement(Connection con) throws SQLException {
                        PreparedStatement statement = con.prepareStatement(query, Statement.RETURN_GENERATED_KEYS);
                        statement.setLong(1, video.getRoute_id());
                        statement.setString(2, video.getLink());
                        statement.setString(3, video.getTitle());
                        statement.setDate(4, (Date) video.getCreate_at());
                        statement.setDate(5, (Date) video.getUpdate_at());
                        statement.setBoolean(6,video.isStatus());
                        return statement;
                    }
                }, holder);
        Long c = holder.getKey().longValue();
        return c;
    }
    // get list video
    public List<VideoDto> listVideo(Long routeId){
        String query="select id,title,link from video where routeid="+routeId;

        List<VideoDto> list= jdbcTemplate.query(query, new RowMapper<VideoDto>() {
            @Override
            public VideoDto mapRow(ResultSet rs, int rowNum) throws SQLException {
                VideoDto video = new VideoDto();
                video.setId(rs.getLong(1));
                video.setLink(rs.getString(3));
                video.setTitle(rs.getString(2));
                return video;
            }
        });
        return list;
    }
    //list video available
    public List<VideoDto> listVideoActive(Long routeId){
        String query="select id,title,link from video where routeid="+routeId+
                " and status=true ";

        List<VideoDto> list1= jdbcTemplate.query(query, new RowMapper<VideoDto>() {
            @Override
            public VideoDto mapRow(ResultSet rs, int rowNum) throws SQLException {
                VideoDto video = new VideoDto();
                video.setId(rs.getLong(1));
                video.setLink(rs.getString(3));
                video.setTitle(rs.getString(2));
                return video;
            }
        });
        return list1;
    }
    //list video unavailable
    public List<VideoDto> listVideoDisable(Long routeId){
        String query="select id,title,link from video where routeid="+routeId+
                "and status=false ";
        List<VideoDto> list2= jdbcTemplate.query(query, new RowMapper<VideoDto>() {
            @Override
            public VideoDto mapRow(ResultSet rs, int rowNum) throws SQLException {
                VideoDto video = new VideoDto();
                video.setId(rs.getLong(1));
                video.setLink(rs.getString(3));
                video.setTitle(rs.getString(2));
                return video;
            }
        });
        return list2;
    }

    public int countByCourseId(long id){
        String qr="select count(v.id) as videos from route r,video v where r.id=v.routeid and r.courseid="+id;
        return jdbcTemplate.queryForObject(qr,Integer.class);
    }

    public Long getTotalVideo(long id) {
        String query="";
        if (id==0)
            query = "SELECT count(1) FROM video where routeid>0";
        else query = "SELECT count(1) FROM video where routeid=" +id;
        return  jdbcTemplate.queryForObject(query, (rs,i)->
                rs.getLong(1)
        );
    }
}
