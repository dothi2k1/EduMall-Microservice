package com.example.orderservice.service;

import com.example.orderservice.dto.request.create.OrderCreateRequest;
import com.example.orderservice.dto.response.OrderResponse;
import com.example.orderservice.entity.Order;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface OrderService {
    ResponseEntity<?> createOrder(OrderCreateRequest request);
    ResponseEntity<?> updateStatus(Long id,Integer status);
    ResponseEntity<?> delete(Long id);
    ResponseEntity<?> getAll(int page,String sort);
    ResponseEntity<?> findById(Long id);
    List<Order> findByStatus(Integer status);
    ResponseEntity<?> countAll();
    ResponseEntity<?> getCountByStatus(int status);

}
