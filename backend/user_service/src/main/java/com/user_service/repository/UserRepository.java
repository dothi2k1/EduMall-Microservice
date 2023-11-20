package com.user_service.repository;

import com.user_service.model.User;
import jdk.jfr.Registered;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User,Integer> {
    Boolean existsByEmail(String email);
    Boolean existsByUsername(String username);
    @Query(value = "select r.rolename from user_role us," +
            "users u, " +
            "roles r " +
            "where us.uid=u.uid and r.user_id=us.id and u.username=:username",nativeQuery = true)
    List<String> findRoles(@Param("username") String username);
    User findByUsername(String username);
}
