package com.example.orderservice.service.impl;

import com.example.orderservice.dto.request.create.OrderCreateRequest;
import com.example.orderservice.dto.response.DataResponse;
import com.example.orderservice.entity.OrderEntity;
import com.example.orderservice.repository.OrderRepository;
import com.example.orderservice.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    private OrderRepository orderRepository;

    @Override
    public DataResponse createOrder(OrderCreateRequest request) {
        //Hàm xử lí đọc cái userId từ authentication
        //fake data user
        OrderEntity entity = new OrderEntity();
        entity.setUserId(request.getUserId());
        entity.setCreatedDate(LocalDate.now());
        entity.setStatus(0);
        orderRepository.save(entity);

        DataResponse dataResponse = DataResponse.ok(entity);
        return  dataResponse;
    }

    @Override
    public ResponseEntity<?> findById(Integer id) {
        if (!orderRepository.existsById(id)){
            return ResponseEntity.status(205).body("Not found");
        }
        return ResponseEntity.ok(orderRepository.findById(id).get());
    }

    @Override
    public ResponseEntity<?> getAll(int page,String sort) {
        Pageable pageable= PageRequest.of(page,20, Sort.by(Sort.Direction.ASC,sort));
        return ResponseEntity.ok(orderRepository.findAll(pageable));
    }
}
