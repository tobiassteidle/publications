package de.deka.shipping.controller;

import de.deka.shipping.model.Versandjob;
import de.deka.shipping.service.MockDataService;
import de.deka.shipping.service.SecurityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/versandjobs")
public class VersandjobController {

    private final MockDataService mockDataService;
    private final SecurityService securityService;

    @Autowired
    public VersandjobController(MockDataService mockDataService, SecurityService securityService) {
        this.mockDataService = mockDataService;
        this.securityService = securityService;
    }

    @GetMapping
    public ResponseEntity<List<Versandjob>> getAllVersandjobs(Authentication authentication) {
        String customerId = securityService.getCustomerId(authentication);

        if (customerId == null) {
            return ResponseEntity.status(403).build();
        }

        List<Versandjob> versandjobs = mockDataService.getAllVersandjobsForCustomer(customerId);
        return ResponseEntity.ok(versandjobs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Versandjob> getVersandjobById(
            @PathVariable Long id,
            Authentication authentication) {

        String customerId = securityService.getCustomerId(authentication);

        if (customerId == null) {
            return ResponseEntity.status(403).build();
        }

        Versandjob versandjob = mockDataService.getVersandjobById(customerId, id);

        if (versandjob == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(versandjob);
    }

    @PostMapping
    public ResponseEntity<Versandjob> createVersandjob(
            @RequestBody Versandjob versandjob,
            Authentication authentication) {

        String customerId = securityService.getCustomerId(authentication);

        if (customerId == null) {
            return ResponseEntity.status(403).build();
        }

        Versandjob createdVersandjob = mockDataService.createVersandjob(customerId, versandjob);
        return ResponseEntity
                .created(URI.create("/api/versandjobs/" + createdVersandjob.getId()))
                .body(createdVersandjob);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Versandjob> updateVersandjob(
            @PathVariable Long id,
            @RequestBody Versandjob versandjob,
            Authentication authentication) {

        String customerId = securityService.getCustomerId(authentication);

        if (customerId == null) {
            return ResponseEntity.status(403).build();
        }

        Versandjob updatedVersandjob = mockDataService.updateVersandjob(customerId, id, versandjob);

        if (updatedVersandjob == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(updatedVersandjob);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVersandjob(
            @PathVariable Long id,
            Authentication authentication) {

        String customerId = securityService.getCustomerId(authentication);

        if (customerId == null) {
            return ResponseEntity.status(403).build();
        }

        boolean deleted = mockDataService.deleteVersandjob(customerId, id);

        if (!deleted) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }
}