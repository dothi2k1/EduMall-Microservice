package com.course.dao;

import com.course.DTO.DocumentDto;
import com.course.model.Document;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.stereotype.Component;

import java.sql.*;
import java.util.List;

@Component
public class DocumentDao {
    private final JdbcTemplate jdbcTemplate;
    GeneratedKeyHolder holder=new GeneratedKeyHolder();

    public DocumentDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    //add document
    public Long addDocument(Document document){
        String rs = "";
        String query = "insert into document(routeid,title,link,createat,updateat,status)" +
                " values (?,?,?,?,?,?)";
        jdbcTemplate.update(
                new PreparedStatementCreator() {
                    @Override
                    public PreparedStatement createPreparedStatement(Connection con) throws SQLException {
                        PreparedStatement statement = con.prepareStatement(query, Statement.RETURN_GENERATED_KEYS);
                        statement.setLong(1, document.getRoute_id());
                        statement.setString(2, document.getTitle());
                        statement.setString(3, document.getLink());
                        statement.setDate(4, (Date) document.getCreate_at());
                        statement.setDate(5, (Date) document.getUpdate_at());
                        statement.setBoolean(6,document.isStatus());
                        return statement;
                    }
                }, holder);
        Long c = holder.getKey().longValue();
        return c;
    }
    //list document
    public List<DocumentDto> listDocument(Long routeId){
        String query="select id,title,link from document where routeid="+routeId;

        List<DocumentDto> list= jdbcTemplate.query(query, new RowMapper<DocumentDto>() {
            @Override
            public DocumentDto mapRow(ResultSet rs, int rowNum) throws SQLException {
                DocumentDto document = new DocumentDto();
                document.setId(rs.getLong(1));
                document.setLink(rs.getString(3));
                document.setTitle(rs.getString(2));
                return document;
            }
        });
        return list;
    }
}
