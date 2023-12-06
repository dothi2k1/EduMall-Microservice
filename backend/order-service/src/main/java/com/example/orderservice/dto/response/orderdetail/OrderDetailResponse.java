package com.example.orderservice.dto.response.orderdetail;

import lombok.Data;

import java.time.LocalDate;

public interface OrderDetailResponse {
    Integer getId();

    Integer getOrderId();

    Integer getCourseId();

    LocalDate getStartAt();

    LocalDate getEndAt();

    String getTitle();
}
