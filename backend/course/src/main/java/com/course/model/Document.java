package com.course.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor

public class Document {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long route_id;
    private String link;
    private String title;
    private Date create_at;
    private Date update_at;
    private boolean status;
}
