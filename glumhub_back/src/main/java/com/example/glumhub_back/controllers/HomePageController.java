package com.example.glumhub_back.controllers;

import com.example.glumhub_back.entities.User;
import com.example.glumhub_back.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("http://localhost:3000")
public class HomePageController {

    @Autowired
    UserService userService;

    @GetMapping("client/currentUserInfo")
    public ResponseEntity<User> getUserInfo(){

        User response = userService.getCurrentUser();
        response.setCredential(null);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("master/currentUserInfo")
    public ResponseEntity<User> getMasterInfo(){

        User response = userService.getCurrentUser();
        response.setCredential(null);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
