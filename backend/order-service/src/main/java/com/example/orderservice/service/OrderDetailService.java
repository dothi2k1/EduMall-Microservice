package com.example.orderservice.service;

import com.example.orderservice.dto.response.orderdetail.OrderDetailResponse;
import com.example.orderservice.entity.Order;
import com.example.orderservice.entity.OrderDetail;
import org.springframework.http.ResponseEntity;

import java.util.List;


public interface OrderDetailService {
    ResponseEntity<?> updateOrderDetail(Long id);
    ResponseEntity<?> deleteOrder(Long id);
    ResponseEntity<?> getAll(int page,String sort);
    List<OrderDetailResponse> findAllOrder(Integer courseId);
}
