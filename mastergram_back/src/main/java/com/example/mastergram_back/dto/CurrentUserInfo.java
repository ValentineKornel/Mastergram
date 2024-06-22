package com.example.mastergram_back.dto;

import com.example.mastergram_back.entities.MasterInfo;
import com.example.mastergram_back.entities.ROLES;

public class CurrentUserInfo {

    private Long id;

    private String username;

    private byte[] profileImageBase64;

    private String email;

    private ROLES role;

    private String firstName;

    private String secondName;

    private String tel;

    private String city;

    private MasterInfo masterInfo;

}
