package com.example.orderservice.dto.response;

import com.example.orderservice.entity.OrderDetail;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.Date;
import java.util.List;
@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
public class OrderResponse {
    private Long id;
    private Long userId;

    private Integer status;

    private Date createdDate;

    private Date updatedDate;

    private Date deletedDate;
    private  Double amount;
    private List<OrderDetail> list;
}
