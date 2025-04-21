package de.deka.shipping.service;

import de.deka.shipping.model.Material;
import de.deka.shipping.model.Versandjob;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

@Service
public class MockDataService {
    private final Map<String, List<Material>> materialsByCustomer = new ConcurrentHashMap<>();
    private final Map<String, List<Versandjob>> versandjobsByCustomer = new ConcurrentHashMap<>();
    private final AtomicLong materialIdCounter = new AtomicLong(1);
    private final AtomicLong versandjobIdCounter = new AtomicLong(1);

    /**
     * Create mock data for a customer if it doesn't already exist.
     * This is used for testing with OAuth2 users instead of hard-coded test users.
     * 
     * @param customerId The customer ID from OAuth2 (subject ID)
     */
    public void ensureMockDataForCustomer(String customerId) {
        if (!materialsByCustomer.containsKey(customerId)) {
            createMockDataForCustomer(customerId);
        }
    }
    
    @PostConstruct
    public void initialize() {
        // This method is kept for backward compatibility but doesn't
        // pre-initialize any customer data anymore. Data will be created
        // on demand when a user is authenticated with OAuth2.
    }

    private void createMockDataForCustomer(String customerId) {
        List<Material> materials = new ArrayList<>();

        materials.add(Material.builder()
                .id(materialIdCounter.getAndIncrement())
                .name("Werbematerial " + customerId)
                .description("Broschüren und Flyer")
                .articleNumber("WM-" + customerId + "-001")
                .quantity(100)
                .customerId(customerId)
                .build());

        materials.add(Material.builder()
                .id(materialIdCounter.getAndIncrement())
                .name("Messedisplay " + customerId)
                .description("Roll-Up Banner für Veranstaltungen")
                .articleNumber("MD-" + customerId + "-002")
                .quantity(5)
                .customerId(customerId)
                .build());

        materials.add(Material.builder()
                .id(materialIdCounter.getAndIncrement())
                .name("Giveaways " + customerId)
                .description("Kugelschreiber und Notizblöcke")
                .articleNumber("GA-" + customerId + "-003")
                .quantity(250)
                .customerId(customerId)
                .build());

        materialsByCustomer.put(customerId, materials);

        List<Versandjob> versandjobs = new ArrayList<>();

        versandjobs.add(Versandjob.builder()
                .id(versandjobIdCounter.getAndIncrement())
                .name("Messe Frankfurt " + customerId)
                .description("Versand von Materialien für die Messe Frankfurt")
                .startDate(LocalDate.now().plusDays(30))
                .endDate(LocalDate.now().plusDays(35))
                .location("Frankfurt Messegelände")
                .status("Geplant")
                .selectedMaterials(List.of(materials.get(0), materials.get(1)))
                .customerId(customerId)
                .build());

        versandjobs.add(Versandjob.builder()
                .id(versandjobIdCounter.getAndIncrement())
                .name("Kundenevent Berlin " + customerId)
                .description("Versand von Materialien für das Kundenevent in Berlin")
                .startDate(LocalDate.now().plusDays(14))
                .endDate(LocalDate.now().plusDays(16))
                .location("Berlin Konferenzzentrum")
                .status("In Vorbereitung")
                .selectedMaterials(List.of(materials.get(0), materials.get(2)))
                .customerId(customerId)
                .build());

        versandjobsByCustomer.put(customerId, versandjobs);
    }

    // Material methods
    public List<Material> getAllMaterialsForCustomer(String customerId) {
        ensureMockDataForCustomer(customerId);
        return materialsByCustomer.getOrDefault(customerId, new ArrayList<>());
    }

    public Material getMaterialById(String customerId, Long id) {
        ensureMockDataForCustomer(customerId);
        return getAllMaterialsForCustomer(customerId).stream()
                .filter(material -> material.getId().equals(id))
                .findFirst()
                .orElse(null);
    }

    // Versandjob methods
    public List<Versandjob> getAllVersandjobsForCustomer(String customerId) {
        ensureMockDataForCustomer(customerId);
        return versandjobsByCustomer.getOrDefault(customerId, new ArrayList<>());
    }

    public Versandjob getVersandjobById(String customerId, Long id) {
        ensureMockDataForCustomer(customerId);
        return getAllVersandjobsForCustomer(customerId).stream()
                .filter(versandjob -> versandjob.getId().equals(id))
                .findFirst()
                .orElse(null);
    }

    public Versandjob createVersandjob(String customerId, Versandjob versandjob) {
        ensureMockDataForCustomer(customerId);
        
        versandjob.setId(versandjobIdCounter.getAndIncrement());
        versandjob.setCustomerId(customerId);

        // Resolve material references
        if (versandjob.getSelectedMaterials() != null) {
            List<Material> resolvedMaterials = versandjob.getSelectedMaterials().stream()
                    .map(material -> getMaterialById(customerId, material.getId()))
                    .filter(material -> material != null)
                    .collect(Collectors.toList());
            versandjob.setSelectedMaterials(resolvedMaterials);
        } else {
            versandjob.setSelectedMaterials(new ArrayList<>());
        }

        List<Versandjob> customerVersandjobs = versandjobsByCustomer.computeIfAbsent(customerId, k -> new ArrayList<>());
        customerVersandjobs.add(versandjob);
        return versandjob;
    }

    public Versandjob updateVersandjob(String customerId, Long id, Versandjob versandjob) {
        ensureMockDataForCustomer(customerId);
        
        List<Versandjob> customerVersandjobs = versandjobsByCustomer.get(customerId);
        if (customerVersandjobs == null) {
            return null;
        }

        for (int i = 0; i < customerVersandjobs.size(); i++) {
            if (customerVersandjobs.get(i).getId().equals(id)) {
                versandjob.setId(id);
                versandjob.setCustomerId(customerId);

                // Resolve material references
                if (versandjob.getSelectedMaterials() != null) {
                    List<Material> resolvedMaterials = versandjob.getSelectedMaterials().stream()
                            .map(material -> getMaterialById(customerId, material.getId()))
                            .filter(material -> material != null)
                            .collect(Collectors.toList());
                    versandjob.setSelectedMaterials(resolvedMaterials);
                } else {
                    versandjob.setSelectedMaterials(new ArrayList<>());
                }

                customerVersandjobs.set(i, versandjob);
                return versandjob;
            }
        }
        return null;
    }

    public boolean deleteVersandjob(String customerId, Long id) {
        ensureMockDataForCustomer(customerId);
        
        List<Versandjob> customerVersandjobs = versandjobsByCustomer.get(customerId);
        if (customerVersandjobs == null) {
            return false;
        }
        return customerVersandjobs.removeIf(versandjob -> versandjob.getId().equals(id));
    }
}
