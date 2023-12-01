package com.userservice.repository;

import com.userservice.model.Discussion;
import com.userservice.model.FeedBack;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface DiscussionRepo extends JpaRepository<Discussion, Long> {
    ResponseEntity<?> save(Discussion discussion);
    ResponseEntity<?> modify(Discussion discussion);
    ResponseEntity<?> deleteDiscussionById(Long id);

    @Query(value = "SELECT * FROM discussion WHERE scid IN " +
            "(SELECT id FROM order_detail WHERE order_id IN " +
            "(SELECT id FROM order WHERE uid IN " +
            "(SELECT id FROM users WHERE username=:username)))",nativeQuery = true)
    List<FeedBack> getAllByUsername(String username);

    List<FeedBack> getAllByScid(Long id);
}
