package com.example.orderservice.dto;

import com.example.orderservice.entity.OrderDetail;
import lombok.Data;

import java.util.List;
@Data
public class CartItem {
    private OrderDetail[] list;
}
