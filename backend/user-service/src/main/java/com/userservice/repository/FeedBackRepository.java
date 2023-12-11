package com.userservice.repository;

import com.userservice.model.FeedBack;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.awt.print.Pageable;

@Repository
public interface FeedBackRepository extends JpaRepository<FeedBack, Long> {
}
