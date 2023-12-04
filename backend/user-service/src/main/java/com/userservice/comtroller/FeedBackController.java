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

    @GetMapping("/get-all")
    public ResponseEntity<?> getAll(@RequestParam int page, @RequestParam String sort) {
        return serviceImp.getAll(page, sort);
    }

    @DeleteMapping("/delete")
    public void deleteById(@RequestParam Long id) {
        serviceImp.deleteById(id);
    }

    @PutMapping("/addfeedback")
    public ResponseEntity<?> save(@RequestBody FeedBack feedBack) {
        return serviceImp.save(feedBack);
    }
}
