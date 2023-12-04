package com.example.orderservice.entity;

public enum Status {
    PREPARING,
    ACCEPTED,
    DECLINED,
    CLOSED;

//    private final int code;
//    private final String description;
//
//    Status(int code, String description) {
//        this.code = code;
//        this.description = description;
//    }
//
//    public int getCode() {
//        return code;
//    }
//
//    public String getDescription() {
//        return description;
//    }
}
/*
*khi save order, list order detail
* lưu order trước xong lấy orderid gán cho từng order detail--> repo.sava all
*
*
*
*
*
*
*  */