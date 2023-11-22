package com.userservice.security;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtTokenFilter extends OncePerRequestFilter {
    public static final Logger log= LoggerFactory.getLogger(JwtProvider.class);
    @Autowired
    JwtProvider jwtProvider;
    @Autowired
    UserDetailsService userDetailsService;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        final String requestTokenHeader = request.getHeader("Authorization");
        String username = null;
        String jwtToken = null;
        if (requestTokenHeader != null && requestTokenHeader.startsWith("Bearer ")) {
            jwtToken = getJwt(request);
            try {
                username = jwtProvider.getUserFromJwt(jwtToken).toString();
            } catch (IllegalArgumentException e) {
                logger.error("No se puede encontrar el token JWT");
            } catch (ExpiredJwtException e) {
                logger.error("Token JWT had expired");
            }
        } else {
            logger.warn("JWT Token not be type Bearer");
        }
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
            try {
                if (jwtProvider.validateToken(jwtToken)) {
                    UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                            userDetails, null, userDetails.getAuthorities());
                    usernamePasswordAuthenticationToken
                            .setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
                }
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
        chain.doFilter(request, response);
    }
    private String getJwt(HttpServletRequest request){
        String authHeader=request.getHeader("Authorization");
        if (authHeader!=null&&authHeader.startsWith("Bearer")){
            return authHeader.replace("Bearer","");
        }
        return null;
    }
    public Authentication getAuthentication(Integer userId, String token) {
        UserDetails userDetails = org.springframework.security.core.userdetails.User
                .withUsername("")
                .password("")
                .build();
        return new UsernamePasswordAuthenticationToken("", "", userDetails.getAuthorities());
    }


}
