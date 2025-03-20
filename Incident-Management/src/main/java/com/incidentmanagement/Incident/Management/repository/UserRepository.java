package com.incidentmanagement.Incident.Management.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.incidentmanagement.Incident.Management.entity.UserEntity;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, String> {
    Optional<UserEntity> findByEmail(String email);
}


