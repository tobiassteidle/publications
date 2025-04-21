import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { RouterModule } from '@angular/router';
import { Versandjob } from '../../models/versandjob.model';
import { MOCK_VERSANDJOBS } from '../../mocks/versandjobs';

@Component({
  selector: 'app-versandjob-list',
  standalone: true,
  imports: [CommonModule, HeaderComponent, RouterModule],
  templateUrl: './versandjob-list.component.html',
  styleUrls: ['./versandjob-list.component.scss']
})
export class VersandjobListComponent implements OnInit {
  versandjobs: Versandjob[] = [];

  constructor() { }

  ngOnInit(): void {
    // Lade Versandjobs für den eingeloggten Benutzer
    const customerId = localStorage.getItem('customerID') || '';
    this.versandjobs = MOCK_VERSANDJOBS.filter(job => job.customerId === customerId);
  }

  getStatusClass(status: string): string {
    switch(status) {
      case 'Offen': return 'status-open';
      case 'In Vorbereitung': return 'status-in-progress';
      case 'Versendet': return 'status-shipped';
      default: return '';
    }
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
}