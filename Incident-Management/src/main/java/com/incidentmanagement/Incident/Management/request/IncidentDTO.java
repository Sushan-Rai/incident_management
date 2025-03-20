package com.incidentmanagement.Incident.Management.request;

import java.time.LocalDateTime;

public class IncidentDTO {

    private String incidentId;
    private String reporterName;
    private String incidentDetails;
    private LocalDateTime reportedDateTime;
    private String priority;
    private String status;

    public IncidentDTO(String incidentId, String reporterName, String incidentDetails,
                       LocalDateTime reportedDateTime, String priority, String status) {
        this.incidentId = incidentId;
        this.reporterName = reporterName;
        this.incidentDetails = incidentDetails;
        this.reportedDateTime = reportedDateTime;
        this.priority = priority;
        this.status = status;
    }

    public String getIncidentId() {
        return incidentId;
    }

    public void setIncidentId(String incidentId) {
        this.incidentId = incidentId;
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

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
