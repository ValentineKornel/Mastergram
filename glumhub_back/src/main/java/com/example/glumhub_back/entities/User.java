package com.example.glumhub_back.entities;


import jakarta.annotation.Nullable;
import jakarta.persistence.*;

import java.util.Arrays;
import java.util.List;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;

    private String FirstName;

    private String SecondName;

    private String city;

    private String email;

    private String tel;

    @Enumerated(EnumType.STRING)
    private ROLES role;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] profileImage;

    @OneToOne(cascade = {CascadeType.PERSIST, CascadeType.REMOVE}, fetch = FetchType.LAZY)
    private Credential credential;

    @OneToOne(cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private MasterInfo masterInfo;

    @OneToMany(mappedBy = "client")
    private List<Booking> bookings;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFirstName() {
        return FirstName;
    }

    public void setFirstName(String firstName) {
        FirstName = firstName;
    }

    public String getSecondName() {
        return SecondName;
    }

    public void setSecondName(String secondName) {
        SecondName = secondName;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public ROLES getRole() {
        return role;
    }

    public void setRole(ROLES role) {
        this.role = role;
    }

    public byte[] getProfileImage() {
        return profileImage;
    }

    public void setProfileImage(byte[] profileImage) {
        this.profileImage = profileImage;
    }

    public Credential getCredential() {
        return credential;
    }

    public void setCredential(Credential credential) {
        this.credential = credential;
    }

    public MasterInfo getMasterInfo() {
        return masterInfo;
    }

    public void setMasterInfo(MasterInfo masterInfo) {
        this.masterInfo = masterInfo;
    }


    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", FirstName='" + FirstName + '\'' +
                ", SecondName='" + SecondName + '\'' +
                ", city='" + city + '\'' +
                ", email='" + email + '\'' +
                ", tel='" + tel + '\'' +
                ", role=" + role +
                ", profileImage=" + Arrays.toString(profileImage) +
                ", credential=" + credential +
                ", masterInfo=" + masterInfo +
                '}';
    }
}
