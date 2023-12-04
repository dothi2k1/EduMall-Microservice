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

}
