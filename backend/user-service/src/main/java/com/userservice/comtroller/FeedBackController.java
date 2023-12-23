package com.userservice.comtroller;

import com.userservice.model.FeedBack;
import com.userservice.service.implement.FeedBackServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/sv1/feedback")
//@CrossOrigin("*")
public class FeedBackController {
    @Autowired
    FeedBackServiceImp serviceImp;
    @GetMapping("/get-by-course-detail/{course_id}")
    public ResponseEntity<?> getByCourseDetail(@PathVariable Long course_id) {
        return serviceImp.getAllFeedBackByCourseId(course_id);
    }
    @GetMapping("/get-by-course-detail-pageable/{course_id}")
    public ResponseEntity<?> getFeedBacksByCourseIdPageable(@PathVariable Long course_id, @RequestParam int page, @RequestParam int direction) {
        return serviceImp.getFeedBacksByCourseIdPageable(course_id, page, direction);
    }

//    @GetMapping("/get-by-course-detail/{course_id}")
//    public ResponseEntity<?> getByCourseDetail(@PathVariable Long course_id) {
//        try {
//            // Gọi phương thức từ service để lấy dữ liệu
//            // Giả sử phương thức trả về một danh sách đối tượng nào đó, bạn có thể thay đổi kiểu dữ liệu tùy thuộc vào trường hợp của mình
//            List<FeedBack> result = (List<FeedBack>) serviceImp.getAllByCourseId(course_id);
//
//            // Kiểm tra xem có dữ liệu không và trả về 200 OK nếu thành công
//            if (!result.isEmpty()) {
//                return ResponseEntity.ok(result);
//            } else {
//                // Trả về 404 Not Found nếu không có dữ liệu
//                return ResponseEntity.notFound().build();
//            }
//        } catch (Exception e) {
//            // Bắt và xử lý bất kỳ lỗi nào, ví dụ: trả về 500 Internal Server Error
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
//        }
//    }
    @GetMapping("/get-all")
    public ResponseEntity<?> getAll() {
        return serviceImp.getAll();
    }

    @GetMapping("/get-all-order-by-time")
    public ResponseEntity<?> getAllOrderByTime(@RequestParam int page, @RequestParam int direction) {
        return serviceImp.getAllOrderByTime(page, direction);
    }

    @GetMapping("/get-all-order-by-star")
    public ResponseEntity<?> getAllOrderByStar(@RequestParam int page, @RequestParam int direction) {
        return serviceImp.getAllOrderByStar(page, direction);
    }

    @DeleteMapping("/delete")
    public void deleteById(@RequestParam Long id) {
        serviceImp.deleteById(id);
    }

    @PutMapping("/add")
    public ResponseEntity<?> save(@RequestBody FeedBack feedBack) {
        return serviceImp.save(feedBack);
    }
}
