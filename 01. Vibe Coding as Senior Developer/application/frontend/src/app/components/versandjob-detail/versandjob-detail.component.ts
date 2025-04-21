import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Versandjob, VersandjobStatus } from '../../models/versandjob.model';
import { MOCK_VERSANDJOBS } from '../../mocks/versandjobs';

@Component({
  selector: 'app-versandjob-detail',
  standalone: true,
  imports: [CommonModule, HeaderComponent, RouterModule],
  templateUrl: './versandjob-detail.component.html',
  styleUrls: ['./versandjob-detail.component.scss']
})
export class VersandjobDetailComponent implements OnInit {
  versandjob: Versandjob | null = null;
  loading: boolean = true;
  error: string | null = null;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    
    if (isNaN(id)) {
      this.error = 'Ungültige Versandjob-ID';
      this.loading = false;
      return;
    }
    
    // In einer realen Anwendung würde hier ein API-Aufruf erfolgen
    setTimeout(() => {
      const foundJob = MOCK_VERSANDJOBS.find(job => job.id === id);
      
      if (foundJob) {
        this.versandjob = foundJob;
      } else {
        this.error = 'Versandjob nicht gefunden';
      }
      
      this.loading = false;
    }, 500); // Simuliere Netzwerkverzögerung
  }
  
  getStatusClass(status: VersandjobStatus): string {
    switch (status) {
      case 'Offen': return 'status-open';
      case 'In Vorbereitung': return 'status-in-progress';
      case 'Versendet': return 'status-shipped';
      default: return '';
    }
  }
  
  goBack(): void {
    this.router.navigate(['/versandjobs']);
  }
}