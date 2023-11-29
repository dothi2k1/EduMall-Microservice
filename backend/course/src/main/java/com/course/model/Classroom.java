package com.course.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Classroom {

    private Long id;
    private Long course_id;
    private Date startAt;
    private Date end_at;
    private String link;
    private int status;
    private String name;

}
