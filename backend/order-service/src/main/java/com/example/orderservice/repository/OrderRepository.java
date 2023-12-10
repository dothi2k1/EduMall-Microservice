package com.example.orderservice.repository;

import com.example.orderservice.dto.OrderDTO;
import com.example.orderservice.dto.response.StudentDTO;
import com.example.orderservice.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByStatus(Integer status);

    @Query("SELECT o.userId, o.id, od.courseId, o.createdDate, od.price, o.status " +
            "FROM Order o " +
            "JOIN OrderDetail od ON o.id = od.order.id")
    List<OrderDTO> findAllOrderDetails();

    int countByStatus(Integer status);
    long countAllByIdNotIn(List<Long> id);

    @Query(value = "select o.uid as userId,o.status as status,od.start_at as startAt," +
            "od.end_at as endAt,od.start_hour as startHour,od.end_hour as endHour" +
            ",od.price as price " +
            "from orders o join order_detail od on o.id = od.order_id" +
            "where uid = :uid ",nativeQuery = true )

    List<StudentDTO> studentCourse(@Param("uid") long uid);
}
