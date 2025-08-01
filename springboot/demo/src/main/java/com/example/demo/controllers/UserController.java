package com.example.demo.controllers;


// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// import com.example.demo.dtos.UserResponseDto;
import com.example.demo.services.UserService;


@RestController
@RequestMapping("/api/auth")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // @GetMapping("/user/{username}")
    // public UserResponseDto getUser(@PathVariable("username") String username) {
    //     return userService.getUserByUsername(username);
    // }
    
}
