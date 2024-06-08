package com.example.glumhub_back.services;

import com.example.glumhub_back.entities.MasterInfo;
import com.example.glumhub_back.entities.User;
import com.example.glumhub_back.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;


    public User save(User user) {return userRepository.save(user);}


    public User create(User user){
        if(userRepository.existsUserByUsername(user.getUsername())){
            throw new RuntimeException("This username is already taken");
        }
        return save(user);
    }


    public User getById(Long id){
        return userRepository.findUserById(id)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    public User getByUsername(String username){
        return userRepository.findUserByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }


    public User getCurrentUser(){
        var username = SecurityContextHolder.getContext().getAuthentication().getName();
        return getByUsername(username);
    }
}
