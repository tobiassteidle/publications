import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { VersandjobService } from '../../versandjob/versandjob.service';
import { Versandjob } from '../../models/versandjob.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent]
})
export class DashboardComponent implements OnInit {
  recentVersandjobs: Versandjob[] = [];
  versandjobStats = {
    total: 0,
    offen: 0,
    inBearbeitung: 0,
    abgeschlossen: 0
  };
  
  constructor(private versandjobService: VersandjobService) { }

  ngOnInit(): void {
    // Hole die letzten 5 Versandjobs für die Übersicht
    this.versandjobService.getVersandjobs().subscribe(jobs => {
      // Sortiere nach Erstellungsdatum (neueste zuerst) und nimm die ersten 5
      this.recentVersandjobs = jobs
        .sort((a, b) => new Date(b.erstelltAm).getTime() - new Date(a.erstelltAm).getTime())
        .slice(0, 5);
      
      // Berechne Statistiken
      this.versandjobStats.total = jobs.length;
      this.versandjobStats.offen = jobs.filter(job => job.status === 'OFFEN').length;
      this.versandjobStats.inBearbeitung = jobs.filter(job => job.status === 'IN_BEARBEITUNG').length;
      this.versandjobStats.abgeschlossen = jobs.filter(job => job.status === 'ABGESCHLOSSEN').length;
    });
  }
}