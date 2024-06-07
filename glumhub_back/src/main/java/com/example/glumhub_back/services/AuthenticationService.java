package com.example.glumhub_back.services;

import com.example.glumhub_back.dto.JwtAuthenticationResponse;
import com.example.glumhub_back.dto.LogInRequest;
import com.example.glumhub_back.dto.SignUpRequest;
import com.example.glumhub_back.entities.Credential;
import com.example.glumhub_back.entities.ROLES;
import com.example.glumhub_back.entities.User;
import com.example.glumhub_back.model.CustomUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    public JwtAuthenticationResponse signUp(SignUpRequest request){

        Credential credential = new Credential();
        credential.setUsername(request.getUsername());
        credential.setPasswordHash(passwordEncoder.encode(request.getPassword()));

        User newUser = new User();
        newUser.setUsername(request.getUsername());
        newUser.setFirstName(request.getFirstName());
        newUser.setSecondName(request.getSecondName());
        newUser.setCity(request.getCity());
        newUser.setEmail(request.getEmail());
        newUser.setTel(request.getTel());
        newUser.setRole(ROLES.ROLE_CLIENT);


        newUser.setCredential(credential);
        credential.setUser(newUser);

        try {
            userService.create(newUser);
        }catch (RuntimeException e){
            return new JwtAuthenticationResponse(HttpStatus.CONFLICT, "This username is already taken");
        }

        var jwt = jwtService.generateToken(newUser);
        return new JwtAuthenticationResponse(jwt);
    }

    public JwtAuthenticationResponse logIn(LogInRequest request){

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    request.getUsername(),
                    request.getPassword()
            ));
        }catch (AuthenticationException e){
            return new JwtAuthenticationResponse(HttpStatus.UNAUTHORIZED, "Incorrect username or password");
        }

        CustomUserDetails user = customUserDetailsService.loadUserByUsername(request.getUsername());

        var jwt = jwtService.generateToken(user.getUser());
        return new JwtAuthenticationResponse(jwt);
    }
}
