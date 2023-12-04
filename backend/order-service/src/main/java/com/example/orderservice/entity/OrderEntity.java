package com.example.orderservice.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "order")
public class OrderEntity {

    @Column(name = "id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "uid")
    private Integer userId;

    @Column(name = "status")
    private Integer status;

    @Column(name = "create_at")
    private LocalDate createdDate;

    @Column(name = "update_at")
    private LocalDate updatedDate;

    @Column(name = "delete_at")
    private LocalDate deletedDate;
}
