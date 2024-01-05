package com.example.orderservice.controller;

import com.example.orderservice.dto.CartItem;
import com.example.orderservice.dto.request.create.OrderCreateRequest;
import com.example.orderservice.entity.Detail;
import com.example.orderservice.entity.Order;
import com.example.orderservice.entity.OrderDetail;
import com.example.orderservice.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;

@RestController
@RequestMapping("api/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/createOrder")
    ResponseEntity<?> createOrder(@RequestBody OrderCreateRequest request){
        return ResponseEntity.ok(orderService.createOrder(request));
    }
    //thêm

    @PostMapping("/distance-order")
    ResponseEntity<?> distanceOrder(@RequestBody OrderCreateRequest request){
        String s=orderService.orderDistanceLearning(request);
        return ResponseEntity.ok(s);
    }

    @PutMapping("/accept")
    ResponseEntity<?> acceptToClass(@RequestParam long id,@RequestParam int status){
        return ResponseEntity.ok(orderService.acceptToClass(id,status));
    }

    @PutMapping("/updateOrder")
    ResponseEntity<?> updateOrder(@RequestParam long id,@RequestParam Integer status){
        return ResponseEntity.ok(orderService.updateStatus(id,status));
    }
    @PostMapping("/update-cart")
    ResponseEntity<?> updateCart(@RequestBody OrderDetail detail,@RequestParam long id){
        return ResponseEntity.ok(orderService.updateOrder(detail,id));
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

    @GetMapping("/find-by-id")
    ResponseEntity<?> findById(@RequestParam(required = false) long id){
        return orderService.findById( id);
    }
    //tìm theo orderId

    @GetMapping("/findByStatus")
    ResponseEntity<?> findByStatus(@RequestParam int status){
        return ResponseEntity.ok(orderService.findByStatus(status));
    }

    //tìm theo trạng thái
    @GetMapping("/countAll")
    ResponseEntity<?> countAll(){
        return (orderService.countAll());
    }

    @GetMapping("/getCountStatus")
    ResponseEntity<?> getCountByStatus(@RequestParam int status){
        return (orderService.getCountByStatus(status));
    }

    @GetMapping("/pivate/statistic")
    ResponseEntity<?> getStatistic(){
        return orderService.statistic();
    }

    @GetMapping("get-own")
    ResponseEntity<?> getBoughtList(@RequestParam long uid,@RequestParam int page){
        return orderService.getOwnOrder(uid, page);
    }

    @GetMapping("get-cart")
    ResponseEntity<?> getCart(@RequestParam long uid){
        return orderService.getPendingOrder(uid);
    }
}
