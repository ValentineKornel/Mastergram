package com.example.mastergram_back.controllers;

import com.example.mastergram_back.dto.UpdateUserRequest;
import com.example.mastergram_back.entities.MasterInfo;
import com.example.mastergram_back.entities.User;
import com.example.mastergram_back.services.JwtService;
import com.example.mastergram_back.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;



@RestController
public class EditProfileController {
    public static final String BEARER_PREFIX = "Bearer ";
    public static final String HEADER_NAME = "Authorization";

    @Autowired
    UserService userService;

    @Autowired
    JwtService jwtService;

    @PostMapping("/client/updateUserInfo")
    public ResponseEntity<String> updateUserInfo(
            @RequestBody UpdateUserRequest request,
            HttpServletRequest httpServletRequest
    ){
        try{
            String base64Data = request.getBase64Image().replaceFirst("^data:image/[a-zA-Z]+;base64,", "");
            byte[] imageData = Base64.getDecoder().decode(base64Data);

            var jwt = httpServletRequest.getHeader("Authorization").substring(BEARER_PREFIX.length());
            Integer userId = jwtService.extractUserId(jwt);
            User user = userService.getById(Long.valueOf(userId));

            user.setUsername(request.getUsername());
            user.setFirstName(request.getFirstName());
            user.setSecondName(request.getSecondName());
            user.setEmail(request.getEmail());
            user.setTel(request.getTel());
            user.setProfileImage(imageData);

            userService.save(user);
        }catch (Exception e){
            System.out.println(e.getMessage());
            System.out.println(e.getStackTrace());
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Conflict");
        }
        return ResponseEntity.status(HttpStatus.OK).body("");
    }


    @PostMapping("/master/updateMasterInfo")
    public ResponseEntity<String> updateMasterInfo(
            @RequestBody UpdateUserRequest request,
            HttpServletRequest httpServletRequest
    ){
        try{
            String base64Data = request.getBase64Image().replaceFirst("^data:image/[a-zA-Z]+;base64,", "");
            byte[] imageData = Base64.getDecoder().decode(base64Data);

            var jwt = httpServletRequest.getHeader("Authorization").substring(BEARER_PREFIX.length());
            Integer userId = jwtService.extractUserId(jwt);
            User user = userService.getById(Long.valueOf(userId));

            if(user.getMasterInfo() == null){
                user.setMasterInfo(new MasterInfo());
            }
            user.getMasterInfo().setDescription(request.getDescription());
            user.getMasterInfo().setBusinessAddress(request.getBusinessAddress());
            user.setUsername(request.getUsername());
            user.setFirstName(request.getFirstName());
            user.setSecondName(request.getSecondName());
            user.setCity(request.getCity());
            user.setEmail(request.getEmail());
            user.setTel(request.getTel());
            user.setProfileImage(imageData);

            userService.save(user);
        }catch (Exception e){
            System.out.println(e.getMessage());
            System.out.println(e.getStackTrace());
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Conflict");
        }
        return ResponseEntity.status(HttpStatus.OK).body("");
    }
}
