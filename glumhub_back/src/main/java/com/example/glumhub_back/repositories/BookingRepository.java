package com.example.glumhub_back.repositories;


import com.example.glumhub_back.entities.Booking;
import com.example.glumhub_back.entities.MasterInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.access.method.P;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    Optional<Booking> findBookingById(Long id);

    @Query("SELECT b FROM Booking b WHERE b.master=:master AND b.date BETWEEN :startDate AND :endDate")
    List<Booking> findBookingsInRange(@Param("master") MasterInfo master,
                                      @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);

    @Query("SELECT b FROM Booking b WHERE b.master=:master AND b.booked=false AND b.date BETWEEN :startDate AND :endDate")
    List<Booking> findFreeBookingsInRange(@Param("master") MasterInfo master,
                                      @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);

    @Query("SELECT b FROM Booking b WHERE b.master=:master AND b.date = :date")
    List<Booking> findBookingsByDate(@Param("master") MasterInfo master, @Param("date") LocalDate date);

    @Query("SELECT b FROM Booking b WHERE b.master=:master AND b.booked = false AND b.date = :date")
    List<Booking> findFreeBookingsByDate(@Param("master") MasterInfo master, @Param("date") LocalDate date);

}
