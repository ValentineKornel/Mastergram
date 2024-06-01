package com.example.glumhub_back.controllers;


import com.example.glumhub_back.dto.JwtAuthenticationResponse;
import com.example.glumhub_back.dto.LogInRequest;
import com.example.glumhub_back.dto.SignUpRequest;
import com.example.glumhub_back.services.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public JwtAuthenticationResponse signUp(@RequestBody SignUpRequest request) {
        return authenticationService.signUp(request);
    }

    @PostMapping("/login")
    public JwtAuthenticationResponse signIn(@RequestBody LogInRequest request) {
        return authenticationService.logIn(request);
    }
}
