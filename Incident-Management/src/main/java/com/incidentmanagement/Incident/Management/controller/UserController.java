package com.incidentmanagement.Incident.Management.controller;

import com.incidentmanagement.Incident.Management.entity.UserEntity;
import com.incidentmanagement.Incident.Management.request.UserLoginRequest;
import com.incidentmanagement.Incident.Management.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody UserEntity user) {
        try {
            userService.registerUser(user);
            return ResponseEntity.ok("User registered successfully!");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{email}")
    public ResponseEntity<UserEntity> getUserByEmail(@PathVariable String email) {
        try {
            UserEntity user = userService.getUserByEmail(email);
            return ResponseEntity.ok(user);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PostMapping("/validate")
    public ResponseEntity<Boolean> validateUser(@RequestBody UserLoginRequest request) {
        try {
            boolean isValid = userService.validateUser(request.getEmail(), request.getPassword());
            return ResponseEntity.ok(isValid);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false);
        }
    }

    @DeleteMapping("/{email}")
    public ResponseEntity<String> deleteUserByEmail(@PathVariable String email) {
        try {
            userService.deleteUserByEmail(email);
            return ResponseEntity.ok("User deleted successfully!");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
