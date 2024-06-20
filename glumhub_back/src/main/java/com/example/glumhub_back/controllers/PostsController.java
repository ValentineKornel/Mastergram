package com.example.glumhub_back.controllers;

import com.example.glumhub_back.dto.CreatePostRequest;
import com.example.glumhub_back.dto.UpdateUserRequest;
import com.example.glumhub_back.entities.Post;
import com.example.glumhub_back.entities.User;
import com.example.glumhub_back.services.JwtService;
import com.example.glumhub_back.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@RestController
public class PostsController {
    public static final String BEARER_PREFIX = "Bearer ";
    public static final String HEADER_NAME = "Authorization";

    @Autowired
    UserService userService;

    @Autowired
    JwtService jwtService;

    @PostMapping("/master/createPost")
    public ResponseEntity<String> createPost(
            @RequestBody CreatePostRequest request,
            HttpServletRequest httpServletRequest
    ){
        try{
            String base64Data = request.getBase64Image().replaceFirst("^data:image/[a-zA-Z]+;base64,", "");
            byte[] imageData = Base64.getDecoder().decode(base64Data);

            //TODO check if was created userInfo

            var jwt = httpServletRequest.getHeader("Authorization").substring(BEARER_PREFIX.length());
            Integer userId = jwtService.extractUserId(jwt);
            User user = userService.getById(Long.valueOf(userId));

            Post newPost = new Post();
            newPost.setPostImage(imageData);
            newPost.setDescription(request.getDescription());
            newPost.setMasterInfo(user.getMasterInfo());

            user.getMasterInfo().addPost(newPost);

            userService.save(user);
        }catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Conflict");
        }
        return ResponseEntity.status(HttpStatus.OK).body("");
    }

    @GetMapping("/master/getPosts")
    public ResponseEntity<List<Post>> getPosts(HttpServletRequest httpServletRequest){

        try{
            var jwt = httpServletRequest.getHeader("Authorization").substring(BEARER_PREFIX.length());
            Integer userId = jwtService.extractUserId(jwt);
            User user = userService.getById(Long.valueOf(userId));

            List<Post> posts = user.getMasterInfo().getPosts();
            List<Post> response = new ArrayList<>();

            for (Post p: posts) {
                response.add(new Post(p.getId(), p.getPostImage(), p.getDescription()));
            }

            return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(List.of());
        }
    }

    @GetMapping("/client/getPosts")
    public ResponseEntity<List<Post>> getPosts(@RequestParam String id){

        try{
            User master = userService.getById(Long.valueOf(id));

            List<Post> posts = master.getMasterInfo().getPosts();
            List<Post> response = new ArrayList<>();

            for (Post p: posts) {
                response.add(new Post(p.getId(), p.getPostImage(), p.getDescription()));
            }

            return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(List.of());
        }
    }
}
