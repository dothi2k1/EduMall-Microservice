package com.course.model;

import com.course.model.listener.CourseListener;
import jakarta.persistence.EntityListeners;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(CourseListener.class)
public class Course {
    private Long id;
    private int type;
    private int uid;
    private int cate;
    private String image;
    private String title;
    private String description;
    private Date createat;
    private Date updateat;
    private Date deleteat;
    private boolean active;
    private double price;
    private double estimate;
    private double rate;
    private long regis;
}
