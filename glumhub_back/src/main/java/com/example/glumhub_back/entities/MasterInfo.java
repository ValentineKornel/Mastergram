package com.example.glumhub_back.entities;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class MasterInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;

    private String businessAddress;

    @OneToMany(mappedBy = "masterInfo", cascade = {CascadeType.PERSIST, CascadeType.REMOVE}, fetch = FetchType.EAGER)
    private List<Post> posts;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getBusinessAddress() {
        return businessAddress;
    }

    public void setBusinessAddress(String businessAddress) {
        this.businessAddress = businessAddress;
    }

    public List<Post> getPosts() {
        return posts;
    }

    public void setPosts(List<Post> posts) {
        this.posts = posts;
    }

    public void addPost(Post newPost){
        posts.add(newPost);
    }

    @Override
    public String toString() {
        return "MasterInfo{" +
                "id=" + id +
                ", description='" + description + '\'' +
                ", businessAddress='" + businessAddress + '\'' +
                '}';
    }
}
