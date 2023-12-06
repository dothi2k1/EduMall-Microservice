package com.example.orderservice.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
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
    public class Order {

        @Column(name = "id")
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Integer id;

        @Column(name = "uid")
        private Integer userId;

        @Column(name = "status")
        private Integer status;

        @Column(name = "create_at")
        private Date createdDate;

        @Column(name = "update_at")
        private Date updatedDate;

        @Column(name = "delete_at")
        private Date deletedDate;
    }

