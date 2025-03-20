package com.incidentmanagement.Incident.Management.service;

import com.incidentmanagement.Incident.Management.entity.UserEntity;
import com.incidentmanagement.Incident.Management.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public UserEntity registerUser(UserEntity user) {
        if (userRepository.existsById(user.getEmail())) {
            throw new IllegalArgumentException("Email is already registered.");
        }
        return userRepository.save(user);
    }

    public UserEntity getUserByEmail(String email) {
        return userRepository.findById(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found with email: " + email));
    }

    public void deleteUserByEmail(String email) {
        if (!userRepository.existsById(email)) {
            throw new IllegalArgumentException("User not found with email: " + email);
        }
        userRepository.deleteById(email);
    }

    public boolean validateUser(String email, String password) {
        Optional<UserEntity> userOptional = userRepository.findByEmail(email);

        if (userOptional.isPresent()) {
            UserEntity user = userOptional.get();
            return user.getPassword().equals(password);
        }
        return false;
    }
}
