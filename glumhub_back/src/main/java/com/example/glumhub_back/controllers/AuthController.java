package com.example.glumhub_back.controllers;


import com.example.glumhub_back.dto.JwtAuthenticationResponse;
import com.example.glumhub_back.dto.LogInRequest;
import com.example.glumhub_back.dto.SignUpRequest;
import com.example.glumhub_back.services.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/sign-up")
    public ResponseEntity<JwtAuthenticationResponse> signUp(@RequestBody SignUpRequest request) {
        JwtAuthenticationResponse response = authenticationService.signUp(request);
        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<JwtAuthenticationResponse> signIn(@RequestBody LogInRequest request) {
        JwtAuthenticationResponse response = authenticationService.logIn(request);

        return ResponseEntity.status(response.getStatus()).body(response);
    }
}
