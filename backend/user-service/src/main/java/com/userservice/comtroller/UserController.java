package com.userservice.comtroller;

import com.userservice.service.implement.UserServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/sv1/user")
@CrossOrigin("*")
public class UserController {
    @Autowired
    UserServiceImp serviceImp;

    @GetMapping("/get-all")
    public ResponseEntity<?> getAll(@RequestParam int page,@RequestParam String sort){
        return serviceImp.getAll(page,sort);
    }

    @PutMapping("/active")
    @Secured("ADMIN")
    public ResponseEntity<?> upgradeToLecture(@RequestParam long id){
        return serviceImp.activeToLecture(id);
    }

    @GetMapping("/summary")
    public ResponseEntity<?> summary(){
        return serviceImp.summary();
    }

    @PutMapping("/disable")
    public ResponseEntity<?> disable(@RequestParam long id){
        return serviceImp.disableAcc(id);
    }
}
