package com.example.orderservice.dto.request.create;

import com.example.orderservice.entity.Order;
import com.example.orderservice.entity.OrderDetail;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderCreateRequest {
    private Order order;
    private List<OrderDetail> list;

}
