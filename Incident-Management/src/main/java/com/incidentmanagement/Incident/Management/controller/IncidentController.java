package com.incidentmanagement.Incident.Management.controller;

import com.incidentmanagement.Incident.Management.entity.IncidentEntity;
import com.incidentmanagement.Incident.Management.service.IncidentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/incidents")
@CrossOrigin
public class IncidentController {

    @Autowired
    private IncidentService incidentService;

    @GetMapping
    public String Testing(){return "Hello World";}

    @PostMapping("/create")
    public ResponseEntity<IncidentEntity> createIncident(@RequestParam String userEmail, @RequestBody IncidentEntity incidentRequest) {
        IncidentEntity createdIncident = incidentService.createIncident(userEmail, incidentRequest);
        return ResponseEntity.ok(createdIncident);
    }

    @GetMapping("/user/{email}")
    public ResponseEntity<List<IncidentEntity>> getIncidentsByUser(@PathVariable String email) {
        List<IncidentEntity> incidents = incidentService.getIncidentsByUser(email);
        return ResponseEntity.ok(incidents);
    }

    @GetMapping("/{incidentId}")
    public ResponseEntity<IncidentEntity> getIncidentById(@PathVariable String incidentId) {
        IncidentEntity incident = incidentService.getIncidentById(incidentId)
                .orElseThrow(() -> new IllegalArgumentException("Incident not found with ID: " + incidentId));
        return ResponseEntity.ok(incident);
    }

    @PutMapping("/{incidentId}")
    public ResponseEntity<IncidentEntity> updateIncident(@PathVariable String incidentId, @RequestBody IncidentEntity updatedIncident) {
        IncidentEntity updated = incidentService.updateIncident(incidentId, updatedIncident);
        return ResponseEntity.ok(updated);
    }
}