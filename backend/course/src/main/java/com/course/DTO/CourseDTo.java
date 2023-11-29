package com.course.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CourseDTo {
    private long id;
    private String username;
    private String title;
    private String description;
    private double price;
    private double estimate;

}
