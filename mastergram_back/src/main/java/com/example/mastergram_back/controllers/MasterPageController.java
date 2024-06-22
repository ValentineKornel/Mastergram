package com.example.mastergram_back.controllers;

import com.example.mastergram_back.dto.ShortMaster;
import com.example.mastergram_back.entities.User;
import com.example.mastergram_back.services.BookingService;
import com.example.mastergram_back.services.JwtService;
import com.example.mastergram_back.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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
    public ResponseEntity<ShortMaster> getMasterInfo(@RequestParam String id,
                                                     HttpServletRequest httpServletRequest){

        try{
            var jwt = httpServletRequest.getHeader("Authorization").substring(BEARER_PREFIX.length());
            Integer userId = jwtService.extractUserId(jwt);
            User client = userService.getById(Long.valueOf(userId));

            User m = userService.getById(Long.valueOf(id));
            boolean following = userService.isFollowing(client.getId(), m.getId());

            ShortMaster response = new ShortMaster(m.getId(),
                    m.getFirstName(),
                    m.getSecondName(),
                    m.getProfileImage(),
                    m.getCity(),
                    m.getMasterInfo().getBusinessAddress(),
                    m.getMasterInfo().getDescription(),
                    following);

            return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch (Exception e) {
            System.out.println(e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping("/client/followMaster")
    public ResponseEntity<String> followMaster(@RequestParam String masterId,
                                                     HttpServletRequest httpServletRequest){

        try{
            var jwt = httpServletRequest.getHeader("Authorization").substring(BEARER_PREFIX.length());
            Integer userId = jwtService.extractUserId(jwt);
            User client = userService.getById(Long.valueOf(userId));

            User m = userService.getById(Long.valueOf(masterId));
            if(!userService.isFollowing(client.getId(), m.getId())){
                client.addMaster(m);
                m.addFollower(client);
            }
            userService.save(client);
            userService.save(m);

            return ResponseEntity.status(HttpStatus.OK).body("following successfully");
        }catch (Exception e) {
            System.out.println(e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping("/client/unFollowMaster")
    public ResponseEntity<String> unFollowMaster(@RequestParam String masterId,
                                               HttpServletRequest httpServletRequest){

        try{
            var jwt = httpServletRequest.getHeader("Authorization").substring(BEARER_PREFIX.length());
            Integer userId = jwtService.extractUserId(jwt);
            User client = userService.getById(Long.valueOf(userId));

            User m = userService.getById(Long.valueOf(masterId));
            if(userService.isFollowing(client.getId(), m.getId())){
                client.removeMaster(m);
                m.removeFollower(client);
            }
            userService.save(client);
            userService.save(m);

            return ResponseEntity.status(HttpStatus.OK).body("unfollowing successfully");
        }catch (Exception e) {
            System.out.println(e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }


}
