package com.userservice.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Calendar;
import java.util.Date;

@Getter
@Setter
@Entity(name = "password_reset_token")
@NoArgsConstructor
public class PasswordResetToken {
    @Id
    private int id;
    private String token;
    public static final int EXPIRATION_TIME=5;
    private Date expiration;
    private int uid;

    public PasswordResetToken(String token,int uid) {
        super();
        this.token = token;
        this.uid=uid;
        this.expiration=getExpiration();
    }

    public Date getExpiration() {
        Calendar calendar=Calendar.getInstance();
        calendar.setTimeInMillis(new Date().getTime());
        calendar.add(Calendar.MINUTE,EXPIRATION_TIME);
        return new Date(calendar.getTime().getTime());
    }


}
