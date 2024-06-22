package com.example.mastergram_back.repositories;


import com.example.mastergram_back.entities.Booking;
import com.example.mastergram_back.entities.MasterInfo;
import com.example.mastergram_back.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

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

    @Query("SELECT b FROM Booking b WHERE b.client=:client AND b.date >= :date")
    List<Booking> findBookingsByClient(@Param("client") User client, @Param("date") LocalDate date);

    @Query("SELECT b FROM Booking b WHERE b.master=:master AND b.booked = true AND b.date >= :date")
    List<Booking> findBookedBookingsByMaster(@Param("master") MasterInfo master, @Param("date") LocalDate date);

}
