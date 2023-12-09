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
        return ResponseEntity.ok(orderService.createOrder(request));
    }
    //thêm
    @PutMapping("/updateOrder")
    ResponseEntity<?> updateOrder(@RequestParam long id,@RequestParam Integer status){
        return ResponseEntity.ok(orderService.updateStatus(id,status));
    }
    //sửa
    @DeleteMapping("/delete")
    ResponseEntity<?> deleteOrder(@RequestParam long id){
        return ResponseEntity.ok(orderService.delete(id));
    }
    //xóa

    @GetMapping("/getall")
    ResponseEntity<?> getAll(@RequestParam int page,@RequestParam String sort){
        return orderService.getAll(page,sort);
    }
    //lấy tất cả order

    @GetMapping("/findById")
    ResponseEntity<?> findById(@RequestParam Long id){
        return orderService.findById(id);}
    //tìm theo orderId

    @GetMapping("/findByStatus")
    ResponseEntity<?> findByStatus(@RequestParam(required = false) Integer status){
        return ResponseEntity.ok(orderService.findByStatus(status));}
    //tìm theo trạng thái
    @GetMapping("/countAll")
    ResponseEntity<?> countAll(){
        return ResponseEntity.ok(orderService.countAll());
    }
    @GetMapping("/getCountStatus")
    ResponseEntity<?> getCountByStatus(@RequestParam int status){
        return ResponseEntity.ok(orderService.getCountByStatus(status));
    }
}
