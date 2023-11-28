package com.course.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "course")
public class Classroom {
    @Id
    private Long id;
    private Long course_id;
    private String start_at;
    private String end_at;
}
