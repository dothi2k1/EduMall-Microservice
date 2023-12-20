package com.userservice.repository;

import com.userservice.model.FeedBack;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeedBackRepository extends JpaRepository<FeedBack,Long> {
    Page<FeedBack> getAllByStar(org.springframework.data.domain.Pageable pageable,int star);
    Page<FeedBack> getFeedBacksByIdNotNullOrderByCreateatDesc(Pageable pageable);
    Page<FeedBack> getFeedBacksByIdNotNullOrderByCreateatAsc(Pageable pageable);
}
