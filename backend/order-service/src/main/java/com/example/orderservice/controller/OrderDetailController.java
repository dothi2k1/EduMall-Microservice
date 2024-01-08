package com.example.orderservice.controller;

import com.example.orderservice.dto.CartItem;
import com.example.orderservice.service.OrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;

@RestController
@RequestMapping("/api/order/order-detail")
public class OrderDetailController {
    @Autowired
    public OrderDetailService orderDetailService;

    @GetMapping("/findOrder")
    ResponseEntity<?> findOrder(@RequestParam(required = false) Integer courseId){
        return ResponseEntity.ok(orderDetailService.findAllOrder(courseId));
    }
    @DeleteMapping("/remove")
    ResponseEntity<?> deleteItem(@RequestParam long id){
        return orderDetailService.deleteOrder(id);
    }
}
