package com.example.glumhub_back.controllers;

import com.example.glumhub_back.dto.ShortMaster;
import com.example.glumhub_back.entities.ROLES;
import com.example.glumhub_back.entities.User;
import com.example.glumhub_back.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AdminController {

    @Autowired
    UserService userService;

    @PostMapping("/admin/makeMaster")
    public ResponseEntity<String> getMasterInfo(@RequestParam String userId){

        try{
            User user = userService.getById(Long.valueOf(userId));
            user.setRole(ROLES.ROLE_MASTER);
            userService.save(user);

            return ResponseEntity.status(HttpStatus.OK).body("set successfully");
        }catch (Exception e) {
            System.out.println(e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}
