package com.example.orderservice.service.impl;

import com.example.orderservice.dto.request.create.OrderCreateRequest;
import com.example.orderservice.dto.request.update.OrderUpdateRequest;

import com.example.orderservice.entity.Order;
import com.example.orderservice.entity.OrderDetail;
import com.example.orderservice.repository.OrderDetailRepository;
import com.example.orderservice.repository.OrderRepository;
import com.example.orderservice.service.OrderService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    OrderRepository orderRepository;
    @Autowired
    OrderDetailRepository orderDetailRepository;

    @Override
    public Order create(Order order) {
        return orderRepository.save(order);
    }

    @Override
    public ResponseEntity<?> save(Order orderEntity) {
        return ResponseEntity.ok(orderRepository.save(orderEntity));
    }

    @Override
    @Transactional
    public ResponseEntity<?> createOrder(OrderCreateRequest request){
        Order order = request.getOrder();
        order.setCreatedDate(new Date());
        order.setStatus(0);
        order.setList(request.getList());
        orderRepository.save(order);
        return ResponseEntity.ok("Create ss!!");
    }

    @Override
    public Order delete(Integer id) {
        Order orderEntity = new Order();
        Date now = new Date();
        orderEntity.setDeletedDate(now);
        orderEntity.setStatus(2);
        return orderRepository.save(orderEntity);
    }

    @Override
    public ResponseEntity<?> update(Integer id, OrderUpdateRequest request) {
        Optional<Order> optionalOrder = orderRepository.findById(id);
        if (optionalOrder.isPresent()){
            Order entity = optionalOrder.get();
            entity.setUpdatedDate(Calendar.getInstance().getTime());
            entity.setStatus(request.getStatus());
            orderRepository.save(entity);
        }
        return ResponseEntity.ok("Update success");
    }

    @Override
    public ResponseEntity<?> findById(Integer id) {
        if (!orderRepository.existsById(id)){
            return ResponseEntity.status(205).body("Not found");
        }
        return ResponseEntity.ok(orderRepository.findById(id).get());
    }


    @Override
    public List<Order> findByStatus(Integer status) {
        return orderRepository.findByStatus(status);
    }
}
