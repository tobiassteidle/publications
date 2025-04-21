import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-versandjob-success',
  standalone: true,
  imports: [CommonModule, HeaderComponent, RouterModule],
  templateUrl: './versandjob-success.component.html',
  styleUrls: ['./versandjob-success.component.scss']
})
export class VersandjobSuccessComponent implements OnInit {
  versandjobId: number = 0;
  
  constructor() {}
  
  ngOnInit(): void {
    // In einer realen Anwendung würde die ID aus dem Router oder einem Service kommen
    this.versandjobId = new Date().getTime(); // Temporärer Mock für eine ID
  }
}