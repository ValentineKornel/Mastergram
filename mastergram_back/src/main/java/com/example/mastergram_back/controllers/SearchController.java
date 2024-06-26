package com.example.mastergram_back.controllers;

import com.example.mastergram_back.dto.ShortMaster;
import com.example.mastergram_back.entities.User;
import com.example.mastergram_back.services.JwtService;
import com.example.mastergram_back.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class SearchController {
    public static final String BEARER_PREFIX = "Bearer ";
    public static final String HEADER_NAME = "Authorization";

    @Autowired
    JwtService jwtService;

    @Autowired
    UserService userService;

    @GetMapping("/client/searchMasters")
    public ResponseEntity<List<ShortMaster>> searchMasters(@RequestParam(required = false) String searchText,
                                                HttpServletRequest httpServletRequest) {
        try {
            var jwt = httpServletRequest.getHeader("Authorization").substring(BEARER_PREFIX.length());
            Integer userId = jwtService.extractUserId(jwt);
            User user = userService.getById(Long.valueOf(userId));

            List<User> masters = userService.searchMasters(user.getId(), searchText);
            List<ShortMaster> response = new ArrayList<>();

            for (User m: masters) {
                response.add(new ShortMaster(m.getId(),
                        m.getFirstName(),
                        m.getSecondName(),
                        m.getProfileImage(),
                        m.getCity(),
                        m.getMasterInfo().getBusinessAddress(),
                        m.getMasterInfo().getDescription(),
                        userService.isFollowing(user.getId(), m.getId())
                        ));
            }

            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}
