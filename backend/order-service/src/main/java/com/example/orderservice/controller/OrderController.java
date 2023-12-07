package com.example.orderservice.controller;

import com.example.orderservice.dto.request.create.OrderCreateRequest;
import com.example.orderservice.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/createOrder")
    ResponseEntity<?> createOrder(@RequestBody OrderCreateRequest request){
        return orderService.createOrder(request);
    }

//    @PostMapping("/save")
//    public ResponseEntity<Object> create(@RequestBody OrderCreateRequest request){
//        DataResponse dataResponse = orderService.createOrder(request);
//        return ResponseEntity.ok(dataResponse);
//    }


    @GetMapping("/findById/{id}")
    ResponseEntity<?> findById(@PathVariable(name = "id") Long id){
        return orderService.findById(id);
    }
}
