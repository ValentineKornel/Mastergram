package com.example.glumhub_back.services;

import com.example.glumhub_back.entities.Booking;
import com.example.glumhub_back.entities.MasterInfo;
import com.example.glumhub_back.repositories.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class BookingService {

    @Autowired
    BookingRepository bookingRepository;

    public Booking findById(Long id){
        return bookingRepository.findBookingById(id).orElseThrow(() -> new NoSuchElementException("not found booking with id:" + id));
    }

    public List<Booking> findBookingsInRange(MasterInfo master, LocalDate startDate, LocalDate endDate){
        return bookingRepository.findBookingsInRange(master, startDate, endDate);
    }

    public List<Booking> findFreeBookingsInRange(MasterInfo master, LocalDate startDate, LocalDate endDate){
        return bookingRepository.findFreeBookingsInRange(master, startDate, endDate);
    }

    public List<Booking> findBookingsByDate(MasterInfo master, LocalDate date){
        return bookingRepository.findBookingsByDate(master, date);
    }

    public List<Booking> findFreeBookingsByDate(MasterInfo master, LocalDate date){
        return bookingRepository.findFreeBookingsByDate(master, date);
    }
}
