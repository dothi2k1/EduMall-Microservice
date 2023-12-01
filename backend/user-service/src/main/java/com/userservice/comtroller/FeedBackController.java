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
    FeedBackServiceImp feedBackServiceImp;

    @GetMapping("/getbyusername")
    public ResponseEntity<?> getAllByUsername(@RequestParam String username) {
        return feedBackServiceImp.getAllByUsername(username);
    }

    @GetMapping("/getbyorderdetail")
    public ResponseEntity<?> getAllByOddt_id(@RequestParam Long id) {
        return feedBackServiceImp.getAllByOddt_id(id);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteFeedBackById(@RequestParam Long id) {
        return feedBackServiceImp.deleteFeedBackById(id);
    }

    @PutMapping("/addfeedback")
    public ResponseEntity<?> save(@RequestBody FeedBack feedBack) {
        return feedBackServiceImp.save(feedBack);
    }

    @PostMapping("/modify")
    public ResponseEntity<?> modify(@RequestBody FeedBack feedBack) {
        return feedBackServiceImp.save(feedBack);
    }
}
