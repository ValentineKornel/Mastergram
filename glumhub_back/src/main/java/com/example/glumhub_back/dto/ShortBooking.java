package com.example.glumhub_back.dto;

import java.time.LocalDate;
import java.time.LocalTime;

public class ShortBooking {

    private Long id;

    private String time;

    private boolean booked;

    public ShortBooking(Long id, String time, boolean booked) {
        this.id = id;
        this.time = time;
        this.booked = booked;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public boolean isBooked() {
        return booked;
    }

    public void setBooked(boolean booked) {
        this.booked = booked;
    }
}
