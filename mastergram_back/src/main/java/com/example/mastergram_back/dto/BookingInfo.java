package com.example.mastergram_back.dto;

import java.time.LocalDate;

public class BookingInfo {

    private Long id;

    private String time;

    private LocalDate date;

    private String masterName;

    private Long masterId;

    private byte[] masterProfileImage;

    private String clientName;

    private Long clientId;

    private byte[] clientProfileImage;

    private String location;

    private String service;

    public BookingInfo(Long id, String time, LocalDate date, String masterName, String location, String service) {
        this.id = id;
        this.time = time;
        this.date = date;
        this.masterName = masterName;
        this.location = location;
        this.service = service;
    }

    public BookingInfo(Long id, String time, LocalDate date, String masterName, Long masterId, byte[] masterProfileImage, String location, String service) {
        this.id = id;
        this.time = time;
        this.date = date;
        this.masterName = masterName;
        this.masterId = masterId;
        this.masterProfileImage = masterProfileImage;
        this.location = location;
        this.service = service;
    }

    public BookingInfo(Long id, String time, LocalDate date, String masterName, String clientName, Long clientId, byte[] clientProfileImage, String location, String service) {
        this.id = id;
        this.time = time;
        this.date = date;
        this.masterName = masterName;
        this.clientName = clientName;
        this.clientId = clientId;
        this.clientProfileImage = clientProfileImage;
        this.location = location;
        this.service = service;
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

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getMasterName() {
        return masterName;
    }

    public void setMasterName(String masterName) {
        this.masterName = masterName;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getService() {
        return service;
    }

    public void setService(String service) {
        this.service = service;
    }

    public Long getMasterId() {
        return masterId;
    }

    public void setMasterId(Long masterId) {
        this.masterId = masterId;
    }

    public byte[] getMasterProfileImage() {
        return masterProfileImage;
    }

    public void setMasterProfileImage(byte[] masterProfileImage) {
        this.masterProfileImage = masterProfileImage;
    }

    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    public Long getClientId() {
        return clientId;
    }

    public void setClientId(Long clientId) {
        this.clientId = clientId;
    }

    public byte[] getClientProfileImage() {
        return clientProfileImage;
    }

    public void setClientProfileImage(byte[] clientProfileImage) {
        this.clientProfileImage = clientProfileImage;
    }
}
