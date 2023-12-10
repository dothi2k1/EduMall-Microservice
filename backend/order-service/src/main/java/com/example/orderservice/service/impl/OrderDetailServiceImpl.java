package com.example.orderservice.service.impl;

import com.example.orderservice.dto.request.create.OrderCreateRequest;
import com.example.orderservice.dto.response.OrderResponse;
import com.example.orderservice.dto.response.orderdetail.OrderDetailResponse;
import com.example.orderservice.entity.Order;
import com.example.orderservice.entity.OrderDetail;
import com.example.orderservice.repository.OrderDetailRepository;
import com.example.orderservice.service.OrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderDetailServiceImpl implements OrderDetailService {
    @Autowired
    public OrderDetailRepository orderDetailRepository;

    
    @Override
    public ResponseEntity<?> updateOrderDetail(Long id,OrderDetail orderDetail) {
        OrderDetail update = orderDetailRepository.findById(id).orElse(null);
        if(update == null){
              return ResponseEntity.status(400).body("Order don't exist");
        }
        update.setOrder(orderDetail.getOrder());
        update.setCourseId(orderDetail.getCourseId());
        update.setPrice(orderDetail.getPrice());
        ResponseEntity.ok(orderDetailRepository.save(update));
        return ResponseEntity.ok("Update success!!");
    }

    @Override
    public ResponseEntity<?> getAll(int page, String sort) {
        Pageable pageable= PageRequest.of(page,20, Sort.by(Sort.Direction.DESC,sort));
        return ResponseEntity.ok(orderDetailRepository.findAll(pageable));
    }

    @Override
    public List<OrderDetailResponse> findAllOrder(Integer courseId) {
        return orderDetailRepository.findAllOrder(courseId);
    }

}
