package de.deka.shipping.controller;

import de.deka.shipping.model.Material;
import de.deka.shipping.service.MockDataService;
import de.deka.shipping.service.SecurityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/materials")
public class MaterialController {

    private final MockDataService mockDataService;
    private final SecurityService securityService;

    @Autowired
    public MaterialController(MockDataService mockDataService, SecurityService securityService) {
        this.mockDataService = mockDataService;
        this.securityService = securityService;
    }

    @GetMapping
    public ResponseEntity<List<Material>> getAllMaterials(Authentication authentication) {
        String customerId = securityService.getCustomerId(authentication);

        if (customerId == null) {
            return ResponseEntity.status(403).build();
        }

        List<Material> materials = mockDataService.getAllMaterialsForCustomer(customerId);
        return ResponseEntity.ok(materials);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Material> getMaterialById(
            @PathVariable Long id,
            Authentication authentication) {

        String customerId = securityService.getCustomerId(authentication);

        if (customerId == null) {
            return ResponseEntity.status(403).build();
        }

        Material material = mockDataService.getMaterialById(customerId, id);

        if (material == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(material);
    }
}