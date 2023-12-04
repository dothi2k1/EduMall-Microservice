package com.example.orderservice.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DataResponse {
    private Integer responseCode;
    private String message;
    private Object result = null;
    private Integer page = null;
    private Integer size = null;
    private Long totalElement = null;
    private Long totalPage = null;

    public static DataResponse ok(Object result) {
        DataResponse res = new DataResponse();
        res.setResponseCode(200);
        res.setResult(result);
        return res;
    }

}
