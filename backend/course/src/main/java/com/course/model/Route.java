package com.course.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Route {
    private Long id;
    private long course_id;
    private int order;
    private String title;
    private String content;
}
