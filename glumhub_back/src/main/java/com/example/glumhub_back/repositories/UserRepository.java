package com.example.glumhub_back.repositories;


import com.example.glumhub_back.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findUserByUsername(String u);

    Optional<User> findUserById(Long id);

    boolean existsUserByUsername(String u);
}
