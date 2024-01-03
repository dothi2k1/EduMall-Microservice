package com.tyzuu.paymentservice.service;

import com.tyzuu.paymentservice.model.PaymentRequest;

public interface PaymentService {
    String createPaymentRequest(PaymentRequest paymentRequest);
}
