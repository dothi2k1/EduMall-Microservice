package com.example.orderservice.repository;

import com.example.orderservice.dto.response.orderdetail.Course;
import com.example.orderservice.dto.response.orderdetail.OrderDetailResponse;
import com.example.orderservice.entity.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetail, Long> {

    @Query(value = "SELECT order_detail.id AS id, order_detail.order_id AS orderId, order_detail.course_id AS courseId, " +
            "order_detail.start_at AS startAt, order_detail.end_at AS endAt, course.title AS title " +
            "FROM order_detail " +
            "LEFT JOIN course ON course.id = order_detail.course_id " +
            "WHERE :courseId IS NULL OR order_detail.course_id = :courseId", nativeQuery = true)
    List<OrderDetailResponse> findAllOrder(@Param("courseId") Integer courseId);
    @Query(value = "select sum(price) from OrderDetail where order.id=:oid")
    Double getAmount(@Param("oid")long oid);

}
