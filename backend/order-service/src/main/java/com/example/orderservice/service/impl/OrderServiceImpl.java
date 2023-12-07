package com.example.orderservice.service.impl;

import com.example.orderservice.dto.request.create.OrderCreateRequest;
import com.example.orderservice.dto.request.update.OrderUpdateRequest;

import com.example.orderservice.entity.Order;
import com.example.orderservice.entity.OrderDetail;
import com.example.orderservice.repository.OrderDetailRepository;
import com.example.orderservice.repository.OrderRepository;
import com.example.orderservice.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    OrderRepository orderRepository;
    @Autowired
    OrderDetailRepository orderDetailRepository;


    @Override
    public ResponseEntity<?> create(Order orderEntity) {
        return null;
    }

    @Override
    public ResponseEntity<?> save(Order orderEntity) {
        return null;
    }

    @Override
    @Transactional
    public ResponseEntity<?> createOrder(OrderCreateRequest request) {
        Order order = new Order();
        order.setUserId(request.getUserId());
        order.setStatus(0);
        List<OrderDetail> set = new ArrayList<>();
        for (OrderDetail orderDetail : request.getList()) {
            OrderDetail od = new OrderDetail();
            od.setCourseId(orderDetail.getCourseId());
            od.setOrder(order);
            set.add(od);
        }
        order.setList(set);
        order= orderRepository.save(order);
        if (order.getId()!=null)
            return ResponseEntity.ok("Create ss!!");
        else return ResponseEntity.status(400).body("Create fail");
    }

    @Override
    public Order delete(long id) {
        Order orderEntity = new Order();
        Date now = new Date();
        orderEntity.setDeletedDate(now);
        orderEntity.setStatus(2);
        return orderRepository.save(orderEntity);
    }

    @Override
    public ResponseEntity<?> update(long id, OrderUpdateRequest request) {
        Optional<Order> optionalOrder = orderRepository.findById(id);
        if (optionalOrder.isPresent()) {
            Order entity = optionalOrder.get();
            entity.setUpdatedDate(Calendar.getInstance().getTime());
            entity.setStatus(request.getStatus());
            orderRepository.save(entity);
        }
        return ResponseEntity.ok("Update success");
    }

    @Override
    public ResponseEntity<?> findById(long id) {
        if (!orderRepository.existsById(id)) {
            return ResponseEntity.status(404).body("Not found");
        }
        Order order=orderRepository.findById(id).get();
        return ResponseEntity.ok(order);
    }


    @Override
    public List<Order> findByStatus(Integer status) {
        return orderRepository.findByStatus(status);
    }
}
