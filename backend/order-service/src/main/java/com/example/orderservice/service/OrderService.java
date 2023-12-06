package com.example.orderservice.service;

import com.example.orderservice.dto.request.create.OrderCreateRequest;
import com.example.orderservice.dto.request.update.OrderUpdateRequest;
import com.example.orderservice.entity.Order;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface OrderService {
    ResponseEntity<?> create(Order orderEntity);
    ResponseEntity<?> save (Order orderEntity);
    ResponseEntity<?> createOrder(OrderCreateRequest request);
    Order delete(long id);
    ResponseEntity<?> update(long id, OrderUpdateRequest request);

    ResponseEntity<?> findById(long id);

    List<Order> findByStatus(Integer status);


    //order detail tìm theo id ứng với course id

    //order

}
