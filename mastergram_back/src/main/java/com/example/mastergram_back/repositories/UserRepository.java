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

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findUserByUsername(String u);

    Optional<User> findUserById(Long id);

    boolean existsUserByUsername(String u);

    @Query("SELECT b FROM Booking b WHERE b.master=:master AND b.date = :date")
    List<Booking> findBookingsByDate(@Param("master") MasterInfo master, @Param("date") LocalDate date);

    @Query("SELECT m FROM User m WHERE m.masterInfo IS NOT NULL AND m.id != :userId AND (m.FirstName LIKE %:search% OR m.SecondName LIKE %:search% OR m.masterInfo.description LIKE %:search%)")
    List<User> findMasterBySearchText(@Param("userId") Long userId, @Param("search") String search);

}
