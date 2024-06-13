package com.example.glumhub_back.controllers;

import com.example.glumhub_back.dto.CreateBookingRequest;
import com.example.glumhub_back.entities.Booking;
import com.example.glumhub_back.entities.User;
import com.example.glumhub_back.services.JwtService;
import com.example.glumhub_back.services.UserService;
import io.jsonwebtoken.Jwt;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;

@RestController
public class BookingController {
    public static final String BEARER_PREFIX = "Bearer ";
    public static final String HEADER_NAME = "Authorization";

    @Autowired
    JwtService jwtService;

    @Autowired
    UserService userService;

    @PostMapping("/master/createBooking")
    public ResponseEntity<String> createBooking(
            @RequestBody CreateBookingRequest request,
            HttpServletRequest httpServletRequest
    ){
        try {
            var jwt = httpServletRequest.getHeader("Authorization").substring(BEARER_PREFIX.length());
            Integer userId = jwtService.extractUserId(jwt);
            User master = userService.getById(Long.valueOf(userId));

            Booking booking = new Booking();
            booking.setService(request.getService());
            booking.setDate(LocalDate.parse(request.getDate()));
            booking.setTime(LocalTime.parse(request.getTime()));
            booking.setMasterComment(request.getComment());
            booking.setMaster(master.getMasterInfo());
            master.getMasterInfo().addBooking(booking);

            userService.save(master);

        }catch (Exception e){
            System.out.println(e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Conflict");
        }
        return ResponseEntity.status(HttpStatus.OK).body("");
    }
}
