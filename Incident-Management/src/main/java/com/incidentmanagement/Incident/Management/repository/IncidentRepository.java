package com.incidentmanagement.Incident.Management.repository;

import com.incidentmanagement.Incident.Management.entity.IncidentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface IncidentRepository extends JpaRepository<IncidentEntity, Long> {

    Optional<IncidentEntity> findByIncidentId(String incidentId);

    List<IncidentEntity> findAllByUser_Email(String email);

}

