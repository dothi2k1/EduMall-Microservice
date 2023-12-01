package com.userservice.repository;

import com.userservice.model.FeedBack;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface FeedBackRepo extends JpaRepository<FeedBack, Long> {
    ResponseEntity<?> save(FeedBack feedBack);
    ResponseEntity<?> modify(FeedBack feedBack);
    ResponseEntity<?> deleteFeedBackById(Long id);

    @Query(value = "SELECT * FROM feedback WHERE oddt_id IN " +
            "(SELECT id FROM order_detail WHERE order_id IN " +
            "(SELECT id FROM order WHERE uid IN " +
            "(SELECT id FROM users WHERE username=:username)))",nativeQuery = true)
    List<FeedBack> getAllByUsername(String username);

    List<FeedBack> getAllByOddt_id(Long id);


}
