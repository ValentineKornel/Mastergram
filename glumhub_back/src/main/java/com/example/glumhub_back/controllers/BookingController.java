package com.example.glumhub_back.controllers;

import com.example.glumhub_back.dto.CreateBookingRequest;
import com.example.glumhub_back.dto.ShortBooking;
import com.example.glumhub_back.entities.Booking;
import com.example.glumhub_back.entities.User;
import com.example.glumhub_back.services.BookingService;
import com.example.glumhub_back.services.JwtService;
import com.example.glumhub_back.services.UserService;
import io.jsonwebtoken.Jwt;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
public class BookingController {
    public static final String BEARER_PREFIX = "Bearer ";
    public static final String HEADER_NAME = "Authorization";

    @Autowired
    JwtService jwtService;

    @Autowired
    UserService userService;

    @Autowired
    BookingService bookingService;

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

    @GetMapping("/master/monthBookings")
    public ResponseEntity<ArrayList<Integer>> getMonthsBooking(@RequestParam String date,
                                                   HttpServletRequest httpServletRequest){
        try {
            var jwt = httpServletRequest.getHeader("Authorization").substring(BEARER_PREFIX.length());
            Integer userId = jwtService.extractUserId(jwt);
            User master = userService.getById(Long.valueOf(userId));

            LocalDate givenDate = LocalDate.parse(date);
            LocalDate firstDayOfMonth = givenDate.withDayOfMonth(1);
            LocalDate lastDayOfMonth = givenDate.with(TemporalAdjusters.lastDayOfMonth());

            List<Booking> bookings = bookingService.findBookingsInRange(master.getMasterInfo(), firstDayOfMonth, lastDayOfMonth);
            ArrayList<Integer> response = new ArrayList<>(Arrays.asList(0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                                                                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                                                                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                                                                        0));
            for (Booking b: bookings) {
                response.set(b.getDate().getDayOfMonth(), response.get(b.getDate().getDayOfMonth())+1);
            }

            return ResponseEntity.status(HttpStatus.OK).body(response);

        }catch (Exception e){
            System.out.println(e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping("/client/masterMonthBookings")
    public ResponseEntity<ArrayList<Integer>> getMasterMonthsBooking(@RequestParam String id,
                                                                     @RequestParam String date){
        try {
            User master = userService.getById(Long.valueOf(id));

            LocalDate givenDate = LocalDate.parse(date);
            LocalDate firstDayOfMonth = givenDate.withDayOfMonth(1);
            LocalDate lastDayOfMonth = givenDate.with(TemporalAdjusters.lastDayOfMonth());

            List<Booking> bookings = bookingService.findFreeBookingsInRange(master.getMasterInfo(), firstDayOfMonth, lastDayOfMonth);
            ArrayList<Integer> response = new ArrayList<>(Arrays.asList(0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0));
            for (Booking b: bookings) {
                response.set(b.getDate().getDayOfMonth(), response.get(b.getDate().getDayOfMonth())+1);
            }

            return ResponseEntity.status(HttpStatus.OK).body(response);

        }catch (Exception e){
            System.out.println(e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping("/master/dayBookings")
    public ResponseEntity<List<ShortBooking>> getDayBookings(@RequestParam String date,
                                                 HttpServletRequest httpServletRequest){
        try{
            var jwt = httpServletRequest.getHeader("Authorization").substring(BEARER_PREFIX.length());
            Integer userId = jwtService.extractUserId(jwt);
            User master = userService.getById(Long.valueOf(userId));

            LocalDate givenDate = LocalDate.parse(date);
            List<Booking> bookings = bookingService.findBookingsByDate(master.getMasterInfo(), givenDate);
            List<ShortBooking> response = new ArrayList<>();

            for (Booking b: bookings) {
                response.add(new ShortBooking(b.getId(), b.getTime().format(DateTimeFormatter.ofPattern("HH:mm")), b.isBooked()));
            }

            return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch (Exception e){
            System.out.println(e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping("/client/masterDayBookings")
    public ResponseEntity<List<ShortBooking>> getMasterDayBookings(@RequestParam String id,
                                                                   @RequestParam String date){
        try{
            User master = userService.getById(Long.valueOf(id));

            LocalDate givenDate = LocalDate.parse(date);
            List<Booking> bookings = bookingService.findFreeBookingsByDate(master.getMasterInfo(), givenDate);
            List<ShortBooking> response = new ArrayList<>();

            for (Booking b: bookings) {
                response.add(new ShortBooking(b.getId(), b.getTime().format(DateTimeFormatter.ofPattern("HH:mm")), b.isBooked()));
            }

            return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch (Exception e){
            System.out.println(e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}
