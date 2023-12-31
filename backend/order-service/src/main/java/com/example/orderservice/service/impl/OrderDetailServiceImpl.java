package com.example.orderservice.service.impl;

import com.example.orderservice.dto.request.create.OrderCreateRequest;
import com.example.orderservice.dto.response.OrderResponse;
import com.example.orderservice.dto.response.orderdetail.OrderDetailResponse;
import com.example.orderservice.entity.Order;
import com.example.orderservice.entity.OrderDetail;
import com.example.orderservice.repository.OrderDetailRepository;
import com.example.orderservice.repository.OrderRepository;
import com.example.orderservice.service.OrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderDetailServiceImpl implements OrderDetailService {
    @Autowired
    public OrderDetailRepository orderDetailRepository;
    @Autowired
    OrderRepository repository;

    @Override
    public ResponseEntity<?> updateOrderDetail(Long id) {
        return null;
    }

    @Override
    public ResponseEntity<?> deleteOrder(Long id) {
        OrderDetail detail=orderDetailRepository.findById(id).get();
        orderDetailRepository.delete(detail);
        return ResponseEntity.ok("delete success");
    }

    @Override
    public ResponseEntity<?> getAll(int page, String sort) {
        return null;
    }

    @Override
    public List<OrderDetailResponse> findAllOrder(Integer courseId) {
        return orderDetailRepository.findAllOrder(courseId);
    }




}
