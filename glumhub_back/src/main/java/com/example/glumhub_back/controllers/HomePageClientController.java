package com.example.glumhub_back.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("http://localhost:3000")
public class HomePageClientController {

    @GetMapping("/homeClient")
    public ResponseEntity<String> getUserInfo(){
        return ResponseEntity.status(HttpStatus.OK).body("Eva");
    }
}
