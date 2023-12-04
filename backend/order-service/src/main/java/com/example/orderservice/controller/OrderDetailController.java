package com.example.orderservice.controller;

import com.example.orderservice.service.OrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/order_detail")
public class OrderDetailController {
    @Autowired
    public OrderDetailService orderDetailService;
}
