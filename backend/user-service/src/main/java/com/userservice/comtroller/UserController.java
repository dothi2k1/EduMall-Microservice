package com.userservice.comtroller;

import com.userservice.service.implement.UserServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("user")
@CrossOrigin("*")
public class UserController {
    @Autowired
    UserServiceImp serviceImp;
    @GetMapping("/get-all")
    public ResponseEntity<?> getAll(int page,String sort){
        return serviceImp.getAll(page,sort);
    }

    @PutMapping("/active")
    public ResponseEntity<?> upgradeToLecture(@RequestParam long id){
        return serviceImp.activeToLecture(id);
    }
}
