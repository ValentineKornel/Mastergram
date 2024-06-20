package com.example.glumhub_back.controllers;

import com.example.glumhub_back.dto.ShortMaster;
import com.example.glumhub_back.entities.User;
import com.example.glumhub_back.services.BookingService;
import com.example.glumhub_back.services.JwtService;
import com.example.glumhub_back.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MasterPageController {
    public static final String BEARER_PREFIX = "Bearer ";
    public static final String HEADER_NAME = "Authorization";

    @Autowired
    JwtService jwtService;

    @Autowired
    UserService userService;

    @Autowired
    BookingService bookingService;


    @GetMapping("/client/masterInfo")
    public ResponseEntity<ShortMaster> getMasterInfo(@RequestParam String id){

        try{
            User m = userService.getById(Long.valueOf(id));
            ShortMaster response = new ShortMaster(m.getId(),
                    m.getFirstName(),
                    m.getSecondName(),
                    m.getProfileImage(),
                    m.getCity(),
                    m.getMasterInfo().getBusinessAddress(),
                    m.getMasterInfo().getDescription());

            return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch (Exception e) {
            System.out.println(e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }



}
