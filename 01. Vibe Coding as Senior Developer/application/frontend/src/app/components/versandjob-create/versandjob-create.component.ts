import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { RouterModule, Router } from '@angular/router';
import { SelectedMaterial, Material } from '../../models/material.model';
import { Veranstaltung, VersandjobRequest } from '../../models/versandjob.model';
import { MOCK_MATERIALS } from '../../mocks/materials';

@Component({
  selector: 'app-versandjob-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent, RouterModule],
  templateUrl: './versandjob-create.component.html',
  styleUrls: ['./versandjob-create.component.scss']
})
export class VersandjobCreateComponent implements OnInit {
  veranstaltungForm: FormGroup;
  materialienForm: FormGroup;
  currentStep = 1;
  
  // Materialauswahl
  availableMaterials: Material[] = [];
  filteredMaterials: Material[] = [];
  selectedMaterials: SelectedMaterial[] = [];
  searchTerm = '';
  
  // Material Detail
  detailMaterial: Material | null = null;
  
  // Warenkorb-Zustand
  isCartOpen = false;
  
  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.veranstaltungForm = this.fb.group({
      name: ['', [Validators.required]],
      beschreibung: [''],
      von: ['', [Validators.required]],
      bis: ['', [Validators.required]],
      strasse: ['', [Validators.required]],
      plz: ['', [Validators.required]],
      ort: ['', [Validators.required]]
    }, { validators: this.dateRangeValidator });
    
    this.materialienForm = this.fb.group({
      search: ['']
    });
  }
  
  // Validator für Datumsbereich (von muss vor bis liegen)
  dateRangeValidator(group: FormGroup) {
    const von = group.get('von')?.value;
    const bis = group.get('bis')?.value;
    
    if (von && bis && new Date(von) > new Date(bis)) {
      group.get('bis')?.setErrors({ dateRange: true });
      return { dateRange: true };
    }
    
    return null;
  }

  ngOnInit(): void {
    // Lade die Materials, die dem aktuellen Kunden gehören
    const customerId = localStorage.getItem('customerID') || '';
    this.availableMaterials = MOCK_MATERIALS.filter(m => m.customerId === customerId);
    this.filteredMaterials = [...this.availableMaterials];
    
    // Reagiere auf Sucheingaben
    this.materialienForm.get('search')?.valueChanges.subscribe(value => {
      this.searchTerm = value;
      this.filterMaterials();
    });
  }
  
  nextStep(): void {
    if (this.currentStep === 1) {
      if (this.veranstaltungForm.valid) {
        this.currentStep = 2;
      } else {
        this.markFormGroupTouched(this.veranstaltungForm);
      }
    }
  }
  
  prevStep(): void {
    if (this.currentStep === 2) {
      this.currentStep = 1;
    }
  }
  
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if ((control as any).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }
  
  filterMaterials(): void {
    if (!this.searchTerm) {
      this.filteredMaterials = [...this.availableMaterials];
      return;
    }
    
    const search = this.searchTerm.toLowerCase();
    this.filteredMaterials = this.availableMaterials.filter(m => 
      m.name.toLowerCase().includes(search) || 
      m.artikelnummer.toLowerCase().includes(search) ||
      m.description.toLowerCase().includes(search)
    );
  }
  
  showDetails(material: Material): void {
    this.detailMaterial = material;
  }
  
  closeDetails(): void {
    this.detailMaterial = null;
  }
  
  addToCart(material: Material, quantity: number = 1): void {
    const existingItem = this.selectedMaterials.find(m => m.id === material.id);
    
    if (existingItem) {
      // Nur hinzufügen, wenn genug verfügbar
      const newQuantity = existingItem.mengeSelected + quantity;
      if (newQuantity <= material.mengeVerfuegbar) {
        existingItem.mengeSelected = newQuantity;
      }
    } else {
      if (quantity <= material.mengeVerfuegbar) {
        this.selectedMaterials.push({
          ...material,
          mengeSelected: quantity
        });
      }
    }
    
    // Automatisch Warenkorb öffnen, wenn etwas hinzugefügt wird
    this.isCartOpen = true;
  }
  
  removeFromCart(materialId: number): void {
    this.selectedMaterials = this.selectedMaterials.filter(m => m.id !== materialId);
  }
  
  updateQuantity(materialId: number, quantity: number): void {
    const item = this.selectedMaterials.find(m => m.id === materialId);
    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(materialId);
      } else if (quantity <= item.mengeVerfuegbar) {
        item.mengeSelected = quantity;
      }
    }
  }
  
  toggleCart(): void {
    this.isCartOpen = !this.isCartOpen;
  }
  
  getTotalItems(): number {
    return this.selectedMaterials.reduce((sum, item) => sum + item.mengeSelected, 0);
  }
  
  submitVersandjob(): void {
    if (this.veranstaltungForm.valid && this.selectedMaterials.length > 0) {
      // Werte aus dem angemeldeten Benutzer (würden in einer realen App aus dem Authentication-Service kommen)
      const username = localStorage.getItem('username') || '';
      
      const veranstaltung: Veranstaltung = {
        name: this.veranstaltungForm.get('name')?.value,
        beschreibung: this.veranstaltungForm.get('beschreibung')?.value,
        von: new Date(this.veranstaltungForm.get('von')?.value),
        bis: new Date(this.veranstaltungForm.get('bis')?.value),
        strasse: this.veranstaltungForm.get('strasse')?.value,
        plz: this.veranstaltungForm.get('plz')?.value,
        ort: this.veranstaltungForm.get('ort')?.value,
        kontaktperson: username, // Vom eingeloggten Benutzer
        kontakttelefon: '+49 123 456789', // Dummy-Wert
        kontaktemail: `${username}@example.com` // Dummy-Wert
      };
      
      const versandjobRequest: VersandjobRequest = {
        veranstaltung,
        materialien: this.selectedMaterials
      };
      
      // Hier würde normalerweise ein API-Aufruf erfolgen
      console.log('Versandjob erstellt:', versandjobRequest);
      
      // Zur Erfolgsseite nach erfolgreicher Erstellung
      this.router.navigate(['/versandjob/erfolg']);
    } else {
      if (this.selectedMaterials.length === 0) {
        alert('Bitte wählen Sie mindestens ein Material aus.');
      }
    }
  }
}