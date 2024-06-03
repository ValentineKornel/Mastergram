package com.example.glumhub_back.controllers;

import com.example.glumhub_back.entities.User;
import com.example.glumhub_back.services.UserService;
import org.apache.tomcat.util.json.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("http://localhost:3000")
public class HomePageClientController {

    @Autowired
    UserService userService;

    @GetMapping("/currentUserInfo")
    public ResponseEntity<User> getUserInfo(){

        User response = userService.getCurrentUser();
        response.setCredential(null);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
