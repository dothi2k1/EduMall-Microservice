package com.userservice.comtroller;

import com.userservice.model.FeedBack;
import com.userservice.service.implement.FeedBackServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/sv1/feedback")
@Secured("")
@CrossOrigin("*")
public class FeedBackController {
    @Autowired
    FeedBackServiceImp serviceImp;

    @GetMapping("/get-all-order-by-time")
    public ResponseEntity<?> getAllOrderByTime(@RequestParam int page, @RequestParam int direction) {
        return serviceImp.getAllOrderByTime(page, direction);
    }

    @GetMapping("/get-all-order-by-star")
    public ResponseEntity<?> getAllOrderByStar(@RequestParam int page, @RequestParam int direction) {
        return serviceImp.getAllOrderByTime(page, direction);
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
