import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Material } from '../../models/material.model';
import { mockMaterials } from '../../mocks/materials';

@Component({
  selector: 'app-material-select',
  templateUrl: './material-select.component.html',
  styleUrls: ['./material-select.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class MaterialSelectComponent implements OnInit {
  @Output() materialSelected = new EventEmitter<Material>();
  
  materials: Material[] = [];
  filteredMaterials: Material[] = [];
  selectedKategorie: string = 'ALLE';
  searchText: string = '';
  
  kategorien: string[] = ['ALLE'];
  
  constructor() { }

  ngOnInit(): void {
    // Im realen Szenario würden wir hier einen Service nutzen, um die Materialien zu laden
    this.materials = mockMaterials;
    
    // Extrahiere alle eindeutigen Kategorien
    const uniqueKategorien = new Set<string>();
    this.materials.forEach(material => uniqueKategorien.add(material.kategorie));
    
    // Füge die Kategorien zum Filter hinzu
    this.kategorien = ['ALLE', ...Array.from(uniqueKategorien)];
    
    // Initial alle Materialien anzeigen
    this.filterMaterials();
  }

  filterMaterials(): void {
    let result = this.materials;
    
    // Kategorie-Filter anwenden
    if (this.selectedKategorie !== 'ALLE') {
      result = result.filter(material => material.kategorie === this.selectedKategorie);
    }
    
    // Suchtext-Filter anwenden
    if (this.searchText.trim() !== '') {
      const searchLower = this.searchText.toLowerCase().trim();
      result = result.filter(material => 
        material.name.toLowerCase().includes(searchLower) ||
        material.beschreibung.toLowerCase().includes(searchLower) ||
        material.artikelnummer.toLowerCase().includes(searchLower)
      );
    }
    
    this.filteredMaterials = result;
  }
  
  selectMaterial(material: Material): void {
    this.materialSelected.emit(material);
  }
}