package com.example.glumhub_back.controllers;

import com.example.glumhub_back.dto.UpdateUserRequest;
import com.example.glumhub_back.entities.User;
import com.example.glumhub_back.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Base64;

@RestController
public class EditProfileController {

    @Autowired
    UserService userService;

    @PostMapping("/updateUserInfo")
    public ResponseEntity<String> updateUserInfo(
            @RequestBody UpdateUserRequest request
    ){
        try{
            String base64Data = request.getBase64Image().replaceFirst("^data:image/[a-zA-Z]+;base64,", "");
            byte[] imageData = Base64.getDecoder().decode(base64Data);

            User user = userService.getById(request.getId());
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
}
