package com.course.model;

import lombok.*;

import java.util.Date;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Category {
    private Long id;
    private String name;
    private String description;
    private Date createAt;
    private Date updateAt;
    private Date deleteAt;
    private boolean status;

 }
