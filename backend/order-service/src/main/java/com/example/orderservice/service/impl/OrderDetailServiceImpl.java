package com.example.orderservice.service.impl;

import com.example.orderservice.dto.response.orderdetail.OrderDetailResponse;
import com.example.orderservice.entity.Order;
import com.example.orderservice.repository.OrderDetailRepository;
import com.example.orderservice.service.OrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderDetailServiceImpl implements OrderDetailService {
    @Autowired
    public OrderDetailRepository orderDetailRepository;



    //trong orderdetail join thêm trường title(course) khi findall     (ok)

    //find all order

    //find all order bị hủy, đang tiến hành,đang chờ phê duyệt

    //order detail tìm theo id ứng với course id

    //order




}
