package com.userservice.security;

import com.userservice.model.user_principle.UserPrinciple;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtProvider {
    public static final Logger log= LoggerFactory.getLogger(JwtProvider.class);
    private final String JWT_SECRET="secretaaaaaaaaaaaaahhhhhhhhhhhhhhhhhhhhhhhhhhhhhhaaaaaaaaaaaaaaatttttttttttttttttttttttttttttttttt";
    private final long JWT_EXPIRATION=86400000L;

    //create token from user
    public String generateToken(Authentication authentication){
        Date now = new Date();
        Date expiryDate=new Date(now.getTime()+JWT_EXPIRATION);
        UserPrinciple userPrinciple=(UserPrinciple) authentication.getPrincipal();
        //create jwt
        return Jwts.builder()
                .setSubject(userPrinciple.getUsername())
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith( key(),SignatureAlgorithm.HS512)
                .compact();
    }

    private Key key() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(JWT_SECRET));
    }
    //get user from jwt
    public Claims getUserFromJwt(String token){
        Claims claims=Jwts.parserBuilder()
                .setSigningKey(key())
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims;
    }
    public boolean validateToken(String authToken) throws Exception {
        try {
            Jwts.parser().setSigningKey(JWT_SECRET).parseClaimsJws(authToken);
            return true;
        } catch (MalformedJwtException ex) {
            log.error("Invalid format jwt->Message:{}",ex);
        } catch (SignatureException ex){
            log.error("Invalid jwt signature->Message:{}",ex);
        } catch (ExpiredJwtException ex) {
            log.error("Expired jwt token->Message:{}",ex);
        } catch (UnsupportedJwtException e){
            log.error("Unsupported jwt token->Message:{}",e);
        } catch (IllegalArgumentException e){
            log.error("jwt class is empty->Message:{}",e);
        }
        return false;
    }
}
