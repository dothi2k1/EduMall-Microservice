package com.course.DTO;

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
    private CourseDTo courseDTo;
    private List<Route> routes;
}
