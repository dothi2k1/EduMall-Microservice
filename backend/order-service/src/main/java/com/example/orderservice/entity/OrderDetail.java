package com.example.orderservice.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "order_detail")
public class OrderDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "course_id")
    private Long courseId;
    @Column(name = "start_at")
    private Date startAt;
    @Column(name = "end_at")
    private Date endAt;
    @Column(name = "start_hour")
    private Date startHour;
    @Column(name = "end_hour")
    private Date endHour;
    @ManyToOne(cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    @JsonBackReference
    @JoinColumn(name = "order_id")
    private Order order;
}
