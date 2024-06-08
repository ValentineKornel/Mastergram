package com.example.glumhub_back.entities;

import jakarta.persistence.*;

import java.util.Arrays;

@Entity
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte [] postImage;

    private String description;

    @ManyToOne(cascade = CascadeType.PERSIST)
    private MasterInfo masterInfo;

    public Post(){ }

    public Post(Long id, byte[] postImage, String description) {
        this.id = id;
        this.postImage = postImage;
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public byte[] getPostImage() {
        return postImage;
    }

    public void setPostImage(byte[] postImage) {
        this.postImage = postImage;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public MasterInfo getMasterInfo() {
        return masterInfo;
    }

    public void setMasterInfo(MasterInfo masterInfo) {
        this.masterInfo = masterInfo;
    }

    @Override
    public String toString() {
        return "Post{" +
                "id=" + id +
                ", postImage=" + Arrays.toString(postImage) +
                ", description='" + description + '\'' +
                ", masterInfo=" + masterInfo +
                '}';
    }
}
