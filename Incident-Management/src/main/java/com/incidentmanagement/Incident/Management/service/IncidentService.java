package com.incidentmanagement.Incident.Management.service;

import com.incidentmanagement.Incident.Management.entity.UserEntity;
import com.incidentmanagement.Incident.Management.entity.IncidentEntity;
import com.incidentmanagement.Incident.Management.repository.UserRepository;
import com.incidentmanagement.Incident.Management.repository.IncidentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class IncidentService {

    @Autowired
    private IncidentRepository incidentRepository;

    @Autowired
    private UserRepository userRepository;

    public IncidentEntity createIncident(String userEmail, IncidentEntity incidentRequest) {
        UserEntity user = userRepository.findById(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("User not found with email: " + userEmail));

        String incidentId = generateUniqueIncidentId();
        incidentRequest.setIncidentId(incidentId);
        incidentRequest.setUser(user);
        incidentRequest.setReportedDateTime(LocalDateTime.now());

        return incidentRepository.save(incidentRequest);
    }

    public List<IncidentEntity> getIncidentsByUser(String userEmail) {
        return incidentRepository.findAllByUser_Email(userEmail);
    }

    public Optional<IncidentEntity> getIncidentById(String incidentId) {
        return incidentRepository.findByIncidentId(incidentId);
    }

    public IncidentEntity updateIncident(String incidentId, IncidentEntity updatedIncident) {
        IncidentEntity existingIncident = incidentRepository.findByIncidentId(incidentId)
                .orElseThrow(() -> new IllegalArgumentException("Incident not found with ID: " + incidentId));

        if (existingIncident.getStatus() == IncidentEntity.Status.CLOSED) {
            throw new IllegalStateException("Cannot edit a closed incident.");
        }

        existingIncident.setIncidentDetails(updatedIncident.getIncidentDetails());
        existingIncident.setPriority(updatedIncident.getPriority());
        existingIncident.setStatus(updatedIncident.getStatus());

        return incidentRepository.save(existingIncident);
    }

    private String generateUniqueIncidentId() {
        Random random = new Random();
        String incidentId;
        do {
            incidentId = "RMG" + (10000 + random.nextInt(90000)) + "2022";
        } while (incidentRepository.findByIncidentId(incidentId).isPresent());
        return incidentId;
    }
}