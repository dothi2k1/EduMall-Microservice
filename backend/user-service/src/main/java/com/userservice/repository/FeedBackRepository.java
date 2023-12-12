package com.userservice.repository;

import com.userservice.model.FeedBack;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeedBackRepository extends PagingAndSortingRepository<FeedBack, Long>,JpaRepository<FeedBack,Long> {
    Page<FeedBack> getFeedBacksByIdNotNullOrderByCreateatAsc(org.springframework.data.domain.Pageable pageable);
    Page<FeedBack> getFeedBacksByIdNotNullOrderByCreateatDesc(Pageable pageable);
}
