package com.course.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "course")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int type;
    private int uid;
    private int cate;
    private String description;
    private Date createat;
    private Date updateat;
    private Date deleteat;
    private boolean active;
    private double price;
    private double estimate;
}
