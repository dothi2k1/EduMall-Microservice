package com.course.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CourseSummary {
    private long id;
    private String username;
    private String title;
    private double price;
    private double estimate;
    private int cate;
    private String image;
    private Date updateat;
    private double rate;
    private long regis;
}
