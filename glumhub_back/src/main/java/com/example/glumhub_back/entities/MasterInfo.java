package com.example.glumhub_back.entities;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class MasterInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;

    private String businessAddress;

    @OneToMany(mappedBy = "masterInfo", cascade = {CascadeType.PERSIST, CascadeType.REMOVE}, fetch = FetchType.EAGER)
    private List<Post> posts;

    @OneToMany(mappedBy = "master", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<Booking> bookings;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getBusinessAddress() {
        return businessAddress;
    }

    public void setBusinessAddress(String businessAddress) {
        this.businessAddress = businessAddress;
    }

    public List<Post> getPosts() {
        return posts;
    }

    public void setPosts(List<Post> posts) {
        this.posts = posts;
    }

    public void addPost(Post newPost){
        posts.add(newPost);
    }

    public List<Booking> getBookings() {
        return bookings;
    }

    public void setBookings(List<Booking> bookings) {
        this.bookings = bookings;
    }

    public void addBooking(Booking booking){
        bookings.add(booking);
    }

    @Override
    public String toString() {
        return "MasterInfo{" +
                "id=" + id +
                ", description='" + description + '\'' +
                ", businessAddress='" + businessAddress + '\'' +
                ", posts=" + posts +
                ", bookings=" + bookings +
                '}';
    }
}
