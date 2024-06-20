package com.example.glumhub_back.controllers;

import com.example.glumhub_back.entities.ROLES;
import com.example.glumhub_back.entities.User;
import com.example.glumhub_back.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class HomePageController {

    @Autowired
    UserService userService;

    @GetMapping("client/currentUserInfo")
    public ResponseEntity<User> getUserInfo(){

        //TODO make it normal

        User response = userService.getCurrentUser();
        response.setCredential(null);
        if(response.getRole() == ROLES.ROLE_MASTER){
            response.getMasterInfo().setPosts(null);
        }

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("master/currentUserInfo")
    public ResponseEntity<User> getMasterInfo(){

        User response = userService.getCurrentUser();
        response.setCredential(null);
        response.setMasterInfo(null);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
