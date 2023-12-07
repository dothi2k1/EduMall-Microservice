package com.course.DTO;

import com.course.model.Course;
import com.course.model.Route;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CourseResponse {
    private Course course;
    private List<RouteDto> routes;
    private List<Course> relative;
}
