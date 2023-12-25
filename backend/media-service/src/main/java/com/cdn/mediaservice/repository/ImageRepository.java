package com.cdn.mediaservice.repository;

import com.cdn.mediaservice.model.Image;
import com.cdn.mediaservice.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ImageRepository extends JpaRepository<Image, Long> {
    List<Image> findByUser(User user);
}
