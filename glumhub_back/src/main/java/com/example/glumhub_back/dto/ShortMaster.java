package com.example.glumhub_back.dto;

public class ShortMaster {

    private Long id;

    private String firstName;

    private String secondName;

    private byte[] profileImage;

    private String city;

    private String businessAddress;

    private String description;

    private boolean following;

    public ShortMaster(Long id, String firstName, String secondName, byte[] profileImage, String city, String businessAddress, String description, boolean following) {
        this.id = id;
        this.firstName = firstName;
        this.secondName = secondName;
        this.profileImage = profileImage;
        this.city = city;
        this.businessAddress = businessAddress;
        this.description = description;
        this.following = following;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getSecondName() {
        return secondName;
    }

    public void setSecondName(String secondName) {
        this.secondName = secondName;
    }

    public byte[] getProfileImage() {
        return profileImage;
    }

    public void setProfileImage(byte[] profileImage) {
        this.profileImage = profileImage;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getBusinessAddress() {
        return businessAddress;
    }

    public void setBusinessAddress(String businessAddress) {
        this.businessAddress = businessAddress;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isFollowing() {
        return following;
    }

    public void setFollowing(boolean following) {
        this.following = following;
    }
}
