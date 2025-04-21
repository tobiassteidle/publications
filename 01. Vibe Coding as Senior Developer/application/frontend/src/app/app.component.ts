import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'DEKA Versandjobs';
  
  constructor(private authService: AuthService) {}
  
  async ngOnInit() {
    console.log('App initialization');
    // Check authentication status when the app initializes
    await this.authService.checkAuthStatus();
    console.log('Initial auth check completed');
  }
}