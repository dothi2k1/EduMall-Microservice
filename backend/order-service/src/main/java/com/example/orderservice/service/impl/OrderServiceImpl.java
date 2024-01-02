package com.example.orderservice.service.impl;

import com.example.orderservice.dto.request.create.OrderCreateRequest;

import com.example.orderservice.dto.response.CustomerInfo;
import com.example.orderservice.dto.response.OrderResponse;
import com.example.orderservice.dto.response.Statistic;
import com.example.orderservice.entity.Order;
import com.example.orderservice.entity.OrderDetail;
import com.example.orderservice.repository.OrderDetailRepository;
import com.example.orderservice.repository.OrderRepository;
import com.example.orderservice.service.OrderService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {
    private final String thank="Thank you for learning on Edumall! If you need any additional assistance, please contract to phone number (+84) 9999999 or email: aabc@gmail.com ";
    private final String wait="Your order was sent to teacher! Newest info will be sent to this email.";
    private final String accept="You are allowed to join class xxx from order xxx";
    private final String full="All classes of this course are full, please try another!";
    @Autowired
    OrderRepository orderRepository;
    @Autowired
    OrderDetailRepository orderDetailRepository;
    @Autowired
    JavaMailSender javaMailSender;
    @Override
    @Transactional
    public String createOrder(OrderCreateRequest request) {
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

        ExecutorService service= Executors.newFixedThreadPool(2);
        String[] rs = new String[1];
        Order finalOrder = orderRepository.save(order);
        service.execute(new Runnable() {
            @Override
            public void run() {
                if (finalOrder.getId() != null) {
                    rs[0] ="Create success";
                }
            }
        });
        service.execute(new Runnable() {
            @Override
            public void run() {
                sendMail(thank);
            }
        });
        service.shutdown();
         return rs[0];
    }

    @Override
    public String orderDistanceLearning(OrderCreateRequest request) {
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

        ExecutorService service= Executors.newFixedThreadPool(2);
        String[] rs = new String[1];
        Order finalOrder = orderRepository.save(order);

        service.execute(new Runnable() {
            @Override
            public void run() {
                sendMail(wait);
            }
        });
        service.execute(new Runnable() {
            @Override
            public void run() {
                if (finalOrder.getId() != null) {
                    rs[0] ="Create success";
                }
            }
        });
        service.shutdown();
        return rs[0];
    }

    @Override
    public ResponseEntity<?> acceptToClass(long id, int status) {
        Optional<Order> order = orderRepository.findById(id);
        ExecutorService service= Executors.newFixedThreadPool(2);
        String[] rs=new String[1];
        service.execute(new Runnable() {
            @Override
            public void run() {
                if (!order.isEmpty()) {
                    if (status == 1) {
                        Order od=order.get();
                        od.setStatus(status);
                        od.setUpdatedDate(new Date());
                        orderRepository.save(od);
                        rs[0]= "Payment success";
                    }
                    if (status==2){
                        Order od=order.get();
                        od.setStatus(status);
                        od.setUpdatedDate(new Date());
                        orderRepository.save(od);
                        rs[0]= "Payment fail";
                    }
                }
            }
        });

        service.execute(new Runnable() {
            @Override
            public void run() {
                if (status==1)
                sendMail(accept);
                else if (status==2)
                    sendMail(full);
            }
        });
        service.shutdown();
        return ResponseEntity.ok(rs[0]);
    }

    @Override
    public String updateStatus(Long id, Integer status) {
        Optional<Order> order = orderRepository.findById(id);
        if (!order.isEmpty()) {
            if (status == 1) {
                Order od=order.get();
                od.setStatus(status);
                od.setUpdatedDate(new Date());
                orderRepository.save(od);
                return "Payment success";
            }
            if (status==2){
                Order od=order.get();
                od.setStatus(status);
                od.setUpdatedDate(new Date());
                orderRepository.save(od);
                return "Payment fail";
            }
        }
        return "Please try again";

    }


    @Override
    public ResponseEntity<?> delete(Long id) {
       Order order = orderRepository.findById(id).get();
        if (order!=null) {
            order.setDeletedDate(new Date());
            order.setStatus(3);
            orderRepository.save(order);
            return ResponseEntity.ok("Delete order success!!!");
        } else {
            return ResponseEntity.status(400).body("OrderId don't exist");
        }
    }

    @Override
    public ResponseEntity<?> findById(Long id) {
        if (!orderRepository.existsById(id)) {
            return ResponseEntity.status(404).body("Not found");
        }
        Order order = orderRepository.findById(id).get();
        OrderResponse response = OrderResponse.builder().id(order.getId()).userId(order.getUserId())
                .createdDate(order.getCreatedDate()).updatedDate(order.getUpdatedDate())
                .deletedDate(order.getDeletedDate()).status(order.getStatus())
                .amount(orderDetailRepository.getAmount(order.getId()))
                .list(order.getList()).build();
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<?> getAll(int page, String sort) {
        Pageable pageable = PageRequest.of(page, 20, Sort.by(Sort.Direction.DESC, sort));
        return ResponseEntity.ok(orderRepository.findAll(pageable));
    }

    @Override
    public List<Order> findByStatus(Integer status) {
        return orderRepository.findByStatus(status);
    }

    @Override
    public ResponseEntity<?> countAll() {
        return ResponseEntity.ok(orderRepository.count());
    }

    @Override
    public ResponseEntity<?> getCountByStatus(int status) {
        return ResponseEntity.ok(orderRepository.countByStatus(status));
    }

    @Override
    public ResponseEntity<?> statistic() {
        return ResponseEntity.ok(
                new Statistic(orderRepository.count(),
                        orderRepository.countByStatus(1),
                        orderRepository.countByStatus(0)));
    }

    @Override
    public ResponseEntity<?> getOwnOrder(long uid,int page) {
        ObjectMapper mapper=new ObjectMapper();
        List<Map<String,Object>> list=orderDetailRepository.getUserBought(uid,page*9);
        List<CustomerInfo> customerInfos=new ArrayList<>();
        for (Map m:list){
            CustomerInfo info=new CustomerInfo();
            info=mapper.convertValue(m,CustomerInfo.class);
            customerInfos.add(info);
        }
        return ResponseEntity.ok(customerInfos);
    }

    @Override
    public ResponseEntity<?> updateOrder(Order order) {
        return ResponseEntity.ok(orderRepository.save(order));
    }

    @Override
    public ResponseEntity<?> getPendingOrder(long uid) {

        try {
            Order order =orderRepository.findOrderByUserIdAndStatus(uid,0).get(0);
            return ResponseEntity.ok(order);
        }
        catch (Exception e) {
            return null;
        }
    }

    void sendMail(String msg){
        SimpleMailMessage message=new SimpleMailMessage();
        message.setTo("aloalo1981998@gmail.com");
        message.setSubject("Edumall notifications");
        message.setText(msg);
        javaMailSender.send(message);
    }
}
