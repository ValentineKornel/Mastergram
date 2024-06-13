package com.example.glumhub_back.repositories;


import com.example.glumhub_back.entities.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepository extends JpaRepository<Long, Booking> {

}
