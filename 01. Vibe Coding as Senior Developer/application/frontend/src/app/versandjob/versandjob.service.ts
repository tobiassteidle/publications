import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Versandjob } from '../models/versandjob.model';
import { Material } from '../models/material.model';
import { environment } from '../../environments/environment';
import { mockVersandjobs } from '../mocks/versandjobs';

@Injectable({
  providedIn: 'root'
})
export class VersandjobService {
  private apiUrl = environment.apiUrl + '/versandjobs';
  
  // Flag für Mock-Modus (wird in Produktion auf false gesetzt)
  private useMockData = true;

  constructor(private http: HttpClient) { }

  // Versandjob-Liste abrufen
  getVersandjobs(): Observable<Versandjob[]> {
    if (this.useMockData) {
      // Im Mock-Modus die Daten aus den Mocks zurückgeben
      return of(mockVersandjobs);
    }
    
    // Im Produktionsmodus vom Backend abrufen
    return this.http.get<Versandjob[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError<Versandjob[]>('getVersandjobs', []))
      );
  }

  // Einzelnen Versandjob abrufen
  getVersandjob(id: number): Observable<Versandjob> {
    if (this.useMockData) {
      // Im Mock-Modus den entsprechenden Versandjob aus den Mocks zurückgeben
      const job = mockVersandjobs.find(job => job.id === id);
      return of(job as Versandjob);
    }
    
    // Im Produktionsmodus vom Backend abrufen
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Versandjob>(url)
      .pipe(
        catchError(this.handleError<Versandjob>(`getVersandjob id=${id}`))
      );
  }

  // Neuen Versandjob erstellen
  createVersandjob(versandjob: Omit<Versandjob, 'id' | 'erstelltAm' | 'geaendertAm'>): Observable<Versandjob> {
    if (this.useMockData) {
      // Im Mock-Modus einen neuen Versandjob erstellen und zu den Mocks hinzufügen
      const newJob: Versandjob = {
        ...versandjob,
        id: Math.max(...mockVersandjobs.map(job => job.id)) + 1,
        erstelltAm: new Date().toISOString(),
        geaendertAm: new Date().toISOString()
      };
      mockVersandjobs.push(newJob);
      return of(newJob);
    }
    
    // Im Produktionsmodus an das Backend senden
    return this.http.post<Versandjob>(this.apiUrl, versandjob)
      .pipe(
        catchError(this.handleError<Versandjob>('createVersandjob'))
      );
  }

  // Versandjob aktualisieren
  updateVersandjob(versandjob: Versandjob): Observable<Versandjob> {
    if (this.useMockData) {
      // Im Mock-Modus den Versandjob in den Mocks aktualisieren
      const index = mockVersandjobs.findIndex(job => job.id === versandjob.id);
      if (index !== -1) {
        const updatedJob = {
          ...versandjob,
          geaendertAm: new Date().toISOString()
        };
        mockVersandjobs[index] = updatedJob;
        return of(updatedJob);
      }
      return of(versandjob);
    }
    
    // Im Produktionsmodus an das Backend senden
    const url = `${this.apiUrl}/${versandjob.id}`;
    return this.http.put<Versandjob>(url, versandjob)
      .pipe(
        catchError(this.handleError<Versandjob>('updateVersandjob'))
      );
  }

  // Versandjob löschen
  deleteVersandjob(id: number): Observable<void> {
    if (this.useMockData) {
      // Im Mock-Modus den Versandjob aus den Mocks entfernen
      const index = mockVersandjobs.findIndex(job => job.id === id);
      if (index !== -1) {
        mockVersandjobs.splice(index, 1);
      }
      return of(undefined);
    }
    
    // Im Produktionsmodus an das Backend senden
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url)
      .pipe(
        catchError(this.handleError<void>('deleteVersandjob'))
      );
  }

  // Material zum Versandjob hinzufügen
  addMaterialToVersandjob(versandjobId: number, material: Material): Observable<Versandjob> {
    if (this.useMockData) {
      // Im Mock-Modus das Material zum Versandjob hinzufügen
      const index = mockVersandjobs.findIndex(job => job.id === versandjobId);
      if (index !== -1) {
        const updatedJob = {
          ...mockVersandjobs[index],
          materialien: [...mockVersandjobs[index].materialien, material],
          geaendertAm: new Date().toISOString()
        };
        mockVersandjobs[index] = updatedJob;
        return of(updatedJob);
      }
      // Wenn kein Versandjob mit der ID gefunden wurde, einen Fehler werfen
      return of(null as any).pipe(
        map(() => {
          throw new Error(`Versandjob mit ID ${versandjobId} nicht gefunden`);
        })
      );
    }
    
    // Im Produktionsmodus an das Backend senden
    const url = `${this.apiUrl}/${versandjobId}/materialien`;
    return this.http.post<Versandjob>(url, material)
      .pipe(
        catchError(this.handleError<Versandjob>('addMaterialToVersandjob'))
      );
  }

  // Material aus dem Versandjob entfernen
  removeMaterialFromVersandjob(versandjobId: number, materialId: number): Observable<Versandjob> {
    if (this.useMockData) {
      // Im Mock-Modus das Material aus dem Versandjob entfernen
      const index = mockVersandjobs.findIndex(job => job.id === versandjobId);
      if (index !== -1) {
        const updatedJob = {
          ...mockVersandjobs[index],
          materialien: mockVersandjobs[index].materialien.filter(m => m.id !== materialId),
          geaendertAm: new Date().toISOString()
        };
        mockVersandjobs[index] = updatedJob;
        return of(updatedJob);
      }
      // Wenn kein Versandjob mit der ID gefunden wurde, einen Fehler werfen
      return of(null as any).pipe(
        map(() => {
          throw new Error(`Versandjob mit ID ${versandjobId} nicht gefunden`);
        })
      );
    }
    
    // Im Produktionsmodus an das Backend senden
    const url = `${this.apiUrl}/${versandjobId}/materialien/${materialId}`;
    return this.http.delete<Versandjob>(url)
      .pipe(
        catchError(this.handleError<Versandjob>('removeMaterialFromVersandjob'))
      );
  }

  // Fehlerbehandlung
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      
      // Rückgabe eines leeren Ergebnisses, damit die Anwendung weiterläuft
      return of(result as T);
    };
  }
}