package com.example.orderservice.service.impl;

import com.example.orderservice.repository.OrderDetailRepository;
import com.example.orderservice.service.OrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderDetailServiceImpl implements OrderDetailService {
    @Autowired
    public OrderDetailRepository orderDetailRepository;

    //trong orderdetail join thêm trường title khi findall
    //find all
    //find all order bị hủy, đang tiến hành,đang chờ phê duyệt
    //order detail tìm theo id ứng với course id
    //order


}
