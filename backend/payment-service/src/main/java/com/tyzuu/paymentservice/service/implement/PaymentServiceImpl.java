package com.tyzuu.paymentservice.service.implement;

import com.tyzuu.paymentservice.model.PaymentRequest;
import com.tyzuu.paymentservice.service.PaymentService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.time.Instant;
import java.util.Formatter;
import java.util.Map;
import java.util.TreeMap;

@Service
public class PaymentServiceImpl implements PaymentService {

    private final WebClient webClient;

    @Value("${payos.client-id}")
    private String clientId;

    @Value("${payos.api-key}")
    private String apiKey;

    @Value("${payos.checksum-key}")
    private String checksumKey;

    public PaymentServiceImpl(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("https://api-merchant.payos.vn").build();
    }

    @Override
    public String createPaymentRequest(PaymentRequest paymentRequest) {
        // Set expiredAt to 30 minutes from now
        paymentRequest.setExpiredAt(Instant.now().plusSeconds(1800).getEpochSecond());

        // Calculate and set the signature in the payment request
        paymentRequest.setSignature(generateSignature(paymentRequest));

        return webClient.post()
                .uri("/v2/payment-requests")
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .header("x-client-id", clientId)
                .header("x-api-key", apiKey)
                .body(BodyInserters.fromValue(paymentRequest))
                .retrieve()
                .bodyToMono(String.class)
                .block(); 
    }

    private String generateSignature(PaymentRequest paymentRequest) {
        Map<String, String> signatureMap = new TreeMap<>();
        signatureMap.put("amount", String.valueOf(paymentRequest.getAmount()));
        signatureMap.put("cancelUrl", paymentRequest.getCancelUrl());
        signatureMap.put("description", paymentRequest.getDescription());
        signatureMap.put("orderCode", String.valueOf(paymentRequest.getOrderCode()));
        signatureMap.put("returnUrl", paymentRequest.getReturnUrl());

        String signatureData = signatureMap.entrySet().stream()
                .map(entry -> entry.getKey() + "=" + entry.getValue())
                .reduce((s1, s2) -> s1 + "&" + s2)
                .orElse("");

        try {
            Mac sha256_HMAC = Mac.getInstance("HmacSHA256");
            SecretKeySpec secret_key = new SecretKeySpec(checksumKey.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
            sha256_HMAC.init(secret_key);

            return toHexString(sha256_HMAC.doFinal(signatureData.getBytes(StandardCharsets.UTF_8)));
        } catch (NoSuchAlgorithmException | InvalidKeyException e) {
            e.printStackTrace();
            return null;
        }
    }



    private String toHexString(byte[] bytes) {
        Formatter formatter = new Formatter();
        for (byte b : bytes) {
            formatter.format("%02x", b);
        }
        return formatter.toString();
    }
}
