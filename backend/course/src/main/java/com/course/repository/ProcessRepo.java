package com.course.repository;

import com.course.model.Process;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProcessRepo extends JpaRepository<Process,Long> {
    Process findByName(String name);
}
