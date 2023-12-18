package com.example.orderservice.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class CustomerInfo {
    private long odid;
    private long uid;
    private String username;
    private long course_id;
    private String title;
    private double price;
    private Date date_buy;
}
