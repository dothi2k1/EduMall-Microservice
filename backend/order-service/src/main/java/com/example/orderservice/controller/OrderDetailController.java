package com.example.orderservice.controller;

import com.example.orderservice.entity.OrderDetail;
import com.example.orderservice.service.OrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/order_detail")
public class OrderDetailController {
    @Autowired
    public OrderDetailService orderDetailService;
    @PutMapping("/update")
    ResponseEntity<?> update(@RequestParam long id, OrderDetail orderDetail){
        return ResponseEntity.ok(orderDetailService.updateOrderDetail(id,orderDetail));
    }

    @GetMapping("findAll")
    ResponseEntity<?> findAll(@RequestParam int page,String sort){
        return ResponseEntity.ok(orderDetailService.getAll(page,sort));
    }

    @GetMapping("/findOrder")
    ResponseEntity<?> findOrder(@RequestParam(required = false) Integer courseId){
        return ResponseEntity.ok(orderDetailService.findAllOrder(courseId));
    }

}
