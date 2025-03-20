package com.incidentmanagement.Incident.Management.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class IncidentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; 

    @Column(nullable = false, unique = true)
    private String incidentId; 

    @ManyToOne
    @JoinColumn(name = "user_email", nullable = false)
    @JsonIgnore
    private UserEntity user; 

    @Column(nullable = false)
    private String reporterName;

    @Column(nullable = false)
    private String incidentDetails;

    @Column(nullable = false)
    private LocalDateTime reportedDateTime;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Priority priority; 

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status; 

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIncidentId() {
        return incidentId;
    }

    public void setIncidentId(String incidentId) {
        this.incidentId = incidentId;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    public String getReporterName() {
        return reporterName;
    }

    public void setReporterName(String reporterName) {
        this.reporterName = reporterName;
    }

    public String getIncidentDetails() {
        return incidentDetails;
    }

    public void setIncidentDetails(String incidentDetails) {
        this.incidentDetails = incidentDetails;
    }

    public LocalDateTime getReportedDateTime() {
        return reportedDateTime;
    }

    public void setReportedDateTime(LocalDateTime reportedDateTime) {
        this.reportedDateTime = reportedDateTime;
    }

    public Priority getPriority() {
        return priority;
    }

    public void setPriority(Priority priority) {
        this.priority = priority;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public enum Priority {
        HIGH, MEDIUM, LOW
    }

    public enum Status {
        OPEN, IN_PROGRESS, CLOSED
    }
}