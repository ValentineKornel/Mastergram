package com.example.mastergram_back.dto;


import org.springframework.http.HttpStatus;

public class JwtAuthenticationResponse {

    private String token;

    private HttpStatus status;

    private String message;

    public JwtAuthenticationResponse(HttpStatus status, String message) {
        this.status = status;
        this.message = message;
    }

    public JwtAuthenticationResponse(String token) {
        this.status = HttpStatus.OK;
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public HttpStatus getStatus() {
        return status;
    }

    public void setStatus(HttpStatus status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
