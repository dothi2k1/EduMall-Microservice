package com.course.DTO;

import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.Date;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class CourseDTo {
    private long id;
    private String username;
    private String title;
    private String description;
    private double price;
    private double estimate;
    private int cate;
    private String image;
    private Date updateat;
    private int routes;
    private int videos;
    private int doc;
    private double rate;
    private long regis;
}

