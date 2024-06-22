package com.example.mastergram_back.dto;

public class ShortBooking {

    private Long id;

    private String time;

    private String service;

    private boolean booked;

    public ShortBooking(Long id, String time, boolean booked) {
        this.id = id;
        this.time = time;
        this.booked = booked;
    }

    public ShortBooking(Long id, String time,String service, boolean booked) {
        this.id = id;
        this.time = time;
        this.service = service;
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

    public String getService() {
        return service;
    }

    public void setService(String service) {
        this.service = service;
    }

    public boolean isBooked() {
        return booked;
    }

    public void setBooked(boolean booked) {
        this.booked = booked;
    }
}
