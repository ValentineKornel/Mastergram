package com.example.glumhub_back.entities;

import jakarta.persistence.*;

import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User client;

    @ManyToOne
    private MasterInfo master;

    private String service;

    private LocalDate date;

    private LocalTime time;

    private boolean booked;

    private String masterComment;

    private String userComment;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getClient() {
        return client;
    }

    public void setClient(User client) {
        this.client = client;
        this.booked = true;
    }

    public MasterInfo getMaster() {
        return master;
    }

    public void setMaster(MasterInfo master) {
        this.master = master;
    }

    public String getService() {
        return service;
    }

    public void setService(String service) {
        this.service = service;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalTime getTime() {
        return time;
    }

    public void setTime(LocalTime time) {
        this.time = time;
    }

    public boolean isBooked() {
        return client == null;
    }

    public String getMasterComment() {
        return masterComment;
    }

    public void setMasterComment(String masterComment) {
        this.masterComment = masterComment;
    }

    public String getUserComment() {
        return userComment;
    }

    public void setUserComment(String userComment) {
        this.userComment = userComment;
    }

    @Override
    public String toString() {
        return "Booking{" +
                "id=" + id +
                ", client=" + client +
                ", master=" + master +
                ", service='" + service + '\'' +
                ", date=" + date +
                ", time=" + time +
                ", booked=" + booked +
                ", masterComment='" + masterComment + '\'' +
                ", userComment='" + userComment + '\'' +
                '}';
    }
}
