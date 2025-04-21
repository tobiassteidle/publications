import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../layout/header/header.component';
import { VersandjobService } from '../versandjob.service';
import { Versandjob } from '../../models/versandjob.model';

@Component({
  selector: 'app-versandjob-list',
  templateUrl: './versandjob-list.component.html',
  styleUrls: ['./versandjob-list.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent]
})
export class VersandjobListComponent implements OnInit {
  versandjobs: Versandjob[] = [];
  loading = true;
  error = '';
  
  // Filter- und Sortieroptionen
  statusFilter: string = 'ALLE';
  sortField: string = 'erstelltAm';
  sortDirection: 'asc' | 'desc' = 'desc';
  
  constructor(private versandjobService: VersandjobService) { }

  ngOnInit(): void {
    this.loadVersandjobs();
  }

  loadVersandjobs(): void {
    this.loading = true;
    this.versandjobService.getVersandjobs()
      .subscribe({
        next: (jobs) => {
          this.versandjobs = jobs;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Fehler beim Laden der Versandjobs: ' + err.message;
          this.loading = false;
        }
      });
  }
  
  get filteredVersandjobs(): Versandjob[] {
    let filtered = [...this.versandjobs];
    
    // Status-Filter anwenden
    if (this.statusFilter !== 'ALLE') {
      filtered = filtered.filter(job => job.status === this.statusFilter);
    }
    
    // Sortierung anwenden
    filtered.sort((a, b) => {
      let comparison = 0;
      
      // Je nach ausgewähltem Sortierfeld
      switch(this.sortField) {
        case 'erstelltAm':
          comparison = new Date(a.erstelltAm).getTime() - new Date(b.erstelltAm).getTime();
          break;
        case 'titel':
          comparison = a.titel.localeCompare(b.titel);
          break;
        case 'status':
          comparison = a.status.localeCompare(b.status);
          break;
        case 'empfaengerName':
          comparison = a.empfaengerName.localeCompare(b.empfaengerName);
          break;
        default:
          comparison = 0;
      }
      
      // Sortierrichtung berücksichtigen
      return this.sortDirection === 'asc' ? comparison : -comparison;
    });
    
    return filtered;
  }
  
  // Filter- und Sortierfunktionen
  setStatusFilter(status: string): void {
    this.statusFilter = status;
  }
  
  setSorting(field: string): void {
    // Wenn das gleiche Feld erneut ausgewählt wird, Sortierrichtung umkehren
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
  }
  
  // Prüfen, ob ein Versandjob gelöscht werden kann (nur im Status OFFEN)
  canDeleteVersandjob(job: Versandjob): boolean {
    return job.status === 'OFFEN';
  }
  
  // Versandjob löschen
  deleteVersandjob(id: number): void {
    if (confirm('Sind Sie sicher, dass Sie diesen Versandjob löschen möchten?')) {
      this.versandjobService.deleteVersandjob(id).subscribe({
        next: () => {
          this.versandjobs = this.versandjobs.filter(job => job.id !== id);
        },
        error: (err) => {
          this.error = 'Fehler beim Löschen des Versandjobs: ' + err.message;
        }
      });
    }
  }
}