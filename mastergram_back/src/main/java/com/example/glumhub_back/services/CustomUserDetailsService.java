package com.example.glumhub_back.services;


import com.example.glumhub_back.entities.User;
import com.example.glumhub_back.model.CustomUserDetails;
import com.example.glumhub_back.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.function.Supplier;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public CustomUserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Supplier<UsernameNotFoundException> s =
                () -> new UsernameNotFoundException("There is no such user in repository");

        User u = userRepository
                .findUserByUsername(username)
                .orElseThrow(s);

        return new CustomUserDetails(u);
    }
}
