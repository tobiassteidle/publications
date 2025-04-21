import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../layout/header/header.component';
import { VersandjobService } from '../versandjob.service';
import { MaterialSelectComponent } from '../material-select/material-select.component';
import { Material } from '../../models/material.model';

@Component({
  selector: 'app-versandjob-create',
  templateUrl: './versandjob-create.component.html',
  styleUrls: ['./versandjob-create.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent, MaterialSelectComponent]
})
export class VersandjobCreateComponent implements OnInit {
  versandjobForm!: FormGroup;
  selectedMaterials: Material[] = [];
  loading = false;
  submitted = false;
  error = '';
  
  constructor(
    private formBuilder: FormBuilder,
    private versandjobService: VersandjobService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.versandjobForm = this.formBuilder.group({
      titel: ['', [Validators.required, Validators.maxLength(100)]],
      beschreibung: ['', [Validators.required, Validators.maxLength(500)]],
      empfaengerName: ['', [Validators.required, Validators.maxLength(100)]],
      empfaengerAdresse: ['', [Validators.required, Validators.maxLength(200)]],
      empfaengerEmail: ['', [Validators.required, Validators.email]],
      empfaengerTelefon: ['', Validators.pattern('^[+]?[0-9 ]{8,20}$')],
      versandtermin: ['', Validators.required],
      notizen: ['', Validators.maxLength(500)]
    });
  }

  // Getter für einfachen Zugriff auf Formularfelder
  get f() { return this.versandjobForm.controls; }

  // Hinzufügen oder Entfernen von Materialien zur Auswahl
  onMaterialSelected(material: Material): void {
    // Prüfen, ob das Material bereits ausgewählt wurde
    const index = this.selectedMaterials.findIndex(m => m.id === material.id);
    
    if (index === -1) {
      // Material hinzufügen
      this.selectedMaterials.push(material);
    }
  }
  
  // Material aus der Auswahl entfernen
  removeMaterial(materialId: number): void {
    this.selectedMaterials = this.selectedMaterials.filter(m => m.id !== materialId);
  }

  onSubmit(): void {
    this.submitted = true;
    
    // Formular ungültig oder keine Materialien ausgewählt
    if (this.versandjobForm.invalid) {
      return;
    }
    
    if (this.selectedMaterials.length === 0) {
      this.error = 'Bitte wählen Sie mindestens ein Material aus.';
      return;
    }
    
    this.loading = true;
    
    const versandjobData = {
      ...this.versandjobForm.value,
      status: 'OFFEN',
      benutzerName: 'Deka Benutzer', // Mock-Benutzer aus dem Login
      benutzerId: 1,                // Mock-Benutzer-ID aus dem Login
      materialien: this.selectedMaterials
    };
    
    this.versandjobService.createVersandjob(versandjobData)
      .subscribe({
        next: (response) => {
          this.loading = false;
          // Weiterleitung zur Übersichtsseite
          this.router.navigate(['/versandjobs']);
        },
        error: (err) => {
          this.error = 'Fehler beim Erstellen des Versandjobs: ' + err.message;
          this.loading = false;
        }
      });
  }
}