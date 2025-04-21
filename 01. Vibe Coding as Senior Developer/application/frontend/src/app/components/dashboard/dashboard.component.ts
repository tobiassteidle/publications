import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { MOCK_VERSANDJOBS } from '../../mocks/versandjobs';

interface DashboardJob {
  id: number;
  name: string;
  startDate: Date;
  endDate: Date;
  location: string;
  status: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  username = '';
  customerID = '';
  recentJobs: DashboardJob[] = [];
  statisticsData = {
    totalJobs: 0,
    openJobs: 0,
    inProgressJobs: 0,
    shippedJobs: 0
  };

  constructor() { }

  ngOnInit(): void {
    // Lade Benutzerdaten
    this.username = localStorage.getItem('username') || '';
    this.customerID = localStorage.getItem('customerID') || '';
    
    // Lade Versandjobs für den aktuellen Benutzer
    const customerId = localStorage.getItem('customerID') || '';
    const userJobs = MOCK_VERSANDJOBS.filter(job => job.customerId === customerId);
    
    // Erstelle vereinfachte Darstellung für Dashboard
    this.recentJobs = userJobs.map(job => ({
      id: job.id,
      name: job.veranstaltung.name,
      startDate: job.veranstaltung.von,
      endDate: job.veranstaltung.bis,
      location: `${job.veranstaltung.plz} ${job.veranstaltung.ort}`,
      status: job.status
    })).slice(0, 3); // Zeige nur die neuesten 3 Jobs
    
    // Berechne Statistiken
    this.statisticsData = {
      totalJobs: userJobs.length,
      openJobs: userJobs.filter(job => job.status === 'Offen').length,
      inProgressJobs: userJobs.filter(job => job.status === 'In Vorbereitung').length,
      shippedJobs: userJobs.filter(job => job.status === 'Versendet').length
    };
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