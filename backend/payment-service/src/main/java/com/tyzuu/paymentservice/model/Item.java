package com.tyzuu.paymentservice.model;
import lombok.Data;

@Data
public class Item {
    private String name;
    private int quantity;
    private int price;
}