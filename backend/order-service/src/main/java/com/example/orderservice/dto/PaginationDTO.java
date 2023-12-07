package com.example.orderservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaginationDTO {
    private Integer pageSize;
    private Integer pageNumber;
    private Long totalElement;
    private Integer totalPage;
}
