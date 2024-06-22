package com.example.mastergram_back.entities;


import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
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

    @ManyToMany
    @JoinTable(name = "masters_followers",
                joinColumns = @JoinColumn(name = "client_id"),
    inverseJoinColumns = @JoinColumn(name = "master_id"))
    private List<User> masters = new ArrayList<>();

    @ManyToMany(mappedBy = "masters")
    private List<User> followers = new ArrayList<>();

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

    public List<Booking> getBookings() {
        return bookings;
    }

    public void setBookings(List<Booking> bookings) {
        this.bookings = bookings;
    }

    public List<User> getMasters() {
        return masters;
    }

    public void setMasters(List<User> masters) {
        this.masters = masters;
    }

    public List<User> getFollowers() {
        return followers;
    }

    public void setFollowers(List<User> followers) {
        this.followers = followers;
    }

    public void addMaster(User master){
        masters.add(master);
    }

    public void removeMaster(User master){
        masters.remove(master);
    }

    public void addFollower(User follower){
        followers.add(follower);
    }

    public void removeFollower(User follower){
        followers.remove(follower);
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
                ", credential=" + credential +
                ", masterInfo=" + masterInfo +
                '}';
    }
}
