package com.gateway.filter;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.checkerframework.checker.units.qual.A;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class AuthenFilter extends AbstractGatewayFilterFactory<AuthenFilter.Config> {
    @Autowired
    JwtProvider jwtProvider;

    public AuthenFilter() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return ((exchange, chain) ->
        {
            //Check author from header

                //Missing
                if (!exchange.getRequest().getHeaders().containsKey(HttpHeaders.AUTHORIZATION))
                    throw new RuntimeException("Missing authorization header");

                //Had author
                String authHeaders = exchange.getRequest().getHeaders().get(HttpHeaders.AUTHORIZATION).get(0);
                if (authHeaders != null && authHeaders.startsWith("Bearer "))
                    authHeaders = authHeaders.substring(7);
                //validate token
                try {
                    jwtProvider.validateToken(authHeaders);
                } catch (Exception e) {
                    System.out.println("Invalid access ...!");
                    throw new RuntimeException("Un Authorization");
                }

            return chain.filter(exchange);
        });
    }

    public static class Config {

    }

}
