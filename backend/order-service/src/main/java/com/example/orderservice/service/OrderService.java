package com.example.orderservice.service;

import com.example.orderservice.dto.request.create.OrderCreateRequest;
import com.example.orderservice.dto.response.DataResponse;
import com.example.orderservice.entity.OrderEntity;
import org.springframework.http.ResponseEntity;

public interface OrderService {
    DataResponse createOrder(OrderCreateRequest request);

    ResponseEntity<?> findById(Integer id);

    ResponseEntity<?> getAll(int page,String sort);
}
