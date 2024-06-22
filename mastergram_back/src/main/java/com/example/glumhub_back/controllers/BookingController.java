package com.example.glumhub_back.controllers;

import com.example.glumhub_back.dto.BookingInfo;
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
            System.out.println(request.getRepeat());

            switch (request.getRepeat()){
                case "dontRepeat": {
                    Booking booking = new Booking();
                    booking.setService(request.getService());
                    booking.setDate(LocalDate.parse(request.getDate()));
                    booking.setTime(LocalTime.parse(request.getTime()));
                    booking.setMasterComment(request.getComment());
                    booking.setMaster(master.getMasterInfo());
                    master.getMasterInfo().addBooking(booking);

                    userService.save(master);
                    break;
                }
                case "daily": {
                    LocalDate givenDate = LocalDate.parse(request.getDate());
                    LocalDate lastDayOfMonth = givenDate.with(TemporalAdjusters.lastDayOfMonth());
                    while (givenDate.isBefore(lastDayOfMonth) || givenDate.isEqual(lastDayOfMonth)){
                        Booking booking = new Booking();
                        booking.setService(request.getService());
                        booking.setDate(givenDate);
                        booking.setTime(LocalTime.parse(request.getTime()));
                        booking.setMasterComment(request.getComment());
                        booking.setMaster(master.getMasterInfo());
                        master.getMasterInfo().addBooking(booking);

                        givenDate = givenDate.plusDays(1);
                    }

                    userService.save(master);
                    break;
                }
                case "weekly": {
                    LocalDate givenDate = LocalDate.parse(request.getDate());
                    LocalDate lastDayOfMonth = givenDate.with(TemporalAdjusters.lastDayOfMonth());
                    while (givenDate.isBefore(lastDayOfMonth) || givenDate.isEqual(lastDayOfMonth)){
                        Booking booking = new Booking();
                        booking.setService(request.getService());
                        booking.setDate(givenDate);
                        booking.setTime(LocalTime.parse(request.getTime()));
                        booking.setMasterComment(request.getComment());
                        booking.setMaster(master.getMasterInfo());
                        master.getMasterInfo().addBooking(booking);

                        givenDate = givenDate.plusWeeks(1);
                    }
                    userService.save(master);
                    break;
                }
            }
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
                                                                        0, 0));
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
                response.add(new ShortBooking(b.getId(), b.getTime().format(DateTimeFormatter.ofPattern("HH:mm")),b.getService(), b.isBooked()));
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
                response.add(new ShortBooking(b.getId(), b.getTime().format(DateTimeFormatter.ofPattern("HH:mm")),b.getService(), b.isBooked()));
            }

            return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch (Exception e){
            System.out.println(e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }


    @GetMapping("/client/booking")
    public ResponseEntity<BookingInfo> getBookingInfo(@RequestParam String bookingId,
                                                             HttpServletRequest httpServletRequest){
        try{
            var jwt = httpServletRequest.getHeader("Authorization").substring(BEARER_PREFIX.length());
            Integer userId = jwtService.extractUserId(jwt);
            User client = userService.getById(Long.valueOf(userId));
            Booking booking = bookingService.findById(Long.valueOf(bookingId));

            BookingInfo response = new BookingInfo(
                    booking.getId(),
                    booking.getTime().format(DateTimeFormatter.ofPattern("HH:mm")),
                    booking.getDate(),
                    booking.getMaster().getMaster().getFirstName()+ " " + booking.getMaster().getMaster().getSecondName(),
                    booking.getMaster().getMaster().getCity() + " " + booking.getMaster().getBusinessAddress(),
                    booking.getService()
            );

            return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch (Exception e){
            System.out.println(e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping("/client/booking")
    public ResponseEntity<String> bookBooking(@RequestParam String bookingId,
                                                      HttpServletRequest httpServletRequest){
        try{
            var jwt = httpServletRequest.getHeader("Authorization").substring(BEARER_PREFIX.length());
            Integer userId = jwtService.extractUserId(jwt);
            User client = userService.getById(Long.valueOf(userId));
            Booking booking = bookingService.findById(Long.valueOf(bookingId));
            booking.setClient(client);
            bookingService.save(booking);

            return ResponseEntity.status(HttpStatus.OK).body("booked successfully");
        }catch (Exception e){
            System.out.println(e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping("/master/myBookings")
    public ResponseEntity<List<BookingInfo>> getMasterBookings(HttpServletRequest httpServletRequest){
        try{
            var jwt = httpServletRequest.getHeader("Authorization").substring(BEARER_PREFIX.length());
            Integer userId = jwtService.extractUserId(jwt);
            User master = userService.getById(Long.valueOf(userId));

            List<Booking> bookings = bookingService.findBookedBookingsByMaster(master.getMasterInfo());
            List<BookingInfo> response = new ArrayList<>();

            for (Booking b: bookings) {
                response.add(new BookingInfo(
                        b.getId(),
                        b.getTime().format(DateTimeFormatter.ofPattern("HH:mm")),
                        b.getDate(),
                        b.getMaster().getMaster().getFirstName(),
                        b.getClient().getFirstName() + " " + b.getClient().getSecondName(),
                        b.getClient().getId(),
                        b.getClient().getProfileImage(),
                        b.getMaster().getBusinessAddress(),
                        b.getService()
                ));
            }

            return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch (Exception e){
            System.out.println(e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping("/client/myBookings")
    public ResponseEntity<List<BookingInfo>> getUserBookings(HttpServletRequest httpServletRequest){
        try{
            var jwt = httpServletRequest.getHeader("Authorization").substring(BEARER_PREFIX.length());
            Integer userId = jwtService.extractUserId(jwt);
            User client = userService.getById(Long.valueOf(userId));

            List<Booking> bookings = bookingService.findBookingsByClient(client);
            List<BookingInfo> response = new ArrayList<>();

            for (Booking b: bookings) {
                response.add(new BookingInfo(
                        b.getId(),
                        b.getTime().format(DateTimeFormatter.ofPattern("HH:mm")),
                        b.getDate(),
                        b.getMaster().getMaster().getFirstName() + " " + b.getMaster().getMaster().getSecondName(),
                        b.getMaster().getMaster().getId(),
                        b.getMaster().getMaster().getProfileImage(),
                        b.getMaster().getMaster().getCity() + " " + b.getMaster().getBusinessAddress(),
                        b.getService()
                ));
            }

            return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch (Exception e){
            System.out.println(e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}
