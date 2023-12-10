package com.example.orderservice.service.impl;

import com.example.orderservice.dto.OrderDTO;
import com.example.orderservice.dto.request.create.OrderCreateRequest;

import com.example.orderservice.dto.response.OrderResponse;
import com.example.orderservice.entity.Order;
import com.example.orderservice.entity.OrderDetail;
import com.example.orderservice.repository.OrderDetailRepository;
import com.example.orderservice.repository.OrderRepository;
import com.example.orderservice.service.OrderService;
import lombok.experimental.SuperBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    OrderRepository orderRepository;
    @Autowired
    OrderDetailRepository orderDetailRepository;

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
    public ResponseEntity<?> updateStatus(Long id, Integer status) {
        Optional<Order> optionalOrder = orderRepository.findById(id);
        if (optionalOrder.isPresent()) {
            Order orderUpdate = optionalOrder.get();
            if (status == 1 || status == 2){
                OrderDetail orderDetail = orderDetailRepository.getReferenceById(id);
                orderUpdate.setStatus(status);
                orderUpdate.setUpdatedDate(new Date());
                orderDetailRepository.save(orderDetail);
                orderRepository.save(orderUpdate);
            }else if(status == 3){
                orderUpdate.setStatus(status);
                orderUpdate.setDeletedDate(new Date());
                orderRepository.save(orderUpdate);
            }
            return ResponseEntity.ok("Update success");
        }else {
            return ResponseEntity.status(400).body("OrderId don't exist");
        }
    }


    @Override
    public ResponseEntity<?> delete(Long id) {
        Optional<Order> optionalOrder = orderRepository.findById(id);
        Order orderEntity = optionalOrder.get();
        if (optionalOrder.isPresent()) {
            orderEntity.setDeletedDate(new Date());
            orderEntity.setStatus(3);
            orderRepository.save(orderEntity);
            return ResponseEntity.ok("Delete order success!!!");
        }else {
            return ResponseEntity.status(400).body("OrderId don't exist");
        }
    }

    @Override
    public ResponseEntity<?> findById(Long id) {
        if (!orderRepository.existsById(id)) {
            return ResponseEntity.status(404).body("Not found");
        }
        Order order=orderRepository.findById(id).get();
        OrderResponse response=OrderResponse.builder().id(order.getId()).userId(order.getUserId())
                .createdDate(order.getCreatedDate()).updatedDate(order.getUpdatedDate())
                .deletedDate(order.getDeletedDate()).status(order.getStatus())
                .amount(orderDetailRepository.getAmount(order.getId()))
                .list(order.getList()).build();
        return ResponseEntity.ok(order);
    }

    @Override
    public ResponseEntity<?> getAll(int page,String sort) {
        Pageable pageable= PageRequest.of(page,20, Sort.by(Sort.Direction.DESC,sort));
        return ResponseEntity.ok(orderRepository.findAll(pageable));
    }

    @Override
    public List<Order> findByStatus(Integer status) {
        return orderRepository.findByStatus(status);
    }

    @Override
    public ResponseEntity<?> countAll() {
        List<Long> c=new ArrayList<>();
        c.add(0L);
        return ResponseEntity.ok(orderRepository.countAllByIdNotIn(c));
    }

    @Override
    public ResponseEntity<?> getCountByStatus(int status) {
        return ResponseEntity.ok(orderRepository.countByStatus(status));
    }

    @Override
    public ResponseEntity<?> studentCourse(int uid) {
        return ResponseEntity.ok(orderRepository.studentCourse(uid));
    }
}
