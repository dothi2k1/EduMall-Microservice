package com.userservice.comtroller;

import com.userservice.model.Discussion;
import com.userservice.service.implement.DiscussionServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/sv1/discussion")
@Secured("")
@CrossOrigin("*")
public class DiscussionController {
    @Autowired
    DiscussionServiceImp serviceImp;

    @GetMapping("/get-all-order-by-time")
    public ResponseEntity<?> getAllOrderByTime(@RequestParam int page, @RequestParam int direction) {
        return serviceImp.getAllOrderByTime(page, direction);
    }

    @DeleteMapping("/delete")
    public void deleteById(@RequestParam Long id) {
        serviceImp.deleteById(id);
    }

    @PutMapping("/add")
    public ResponseEntity<?> save(@RequestBody Discussion discussion) {
        return serviceImp.save(discussion);
    }
}
