import { SelectedMaterial } from './material.model';

export interface Veranstaltung {
  name: string;
  beschreibung?: string;
  von: Date;
  bis: Date;
  strasse: string;
  plz: string;
  ort: string;
  kontaktperson: string;
  kontakttelefon: string;
  kontaktemail: string;
}

export type VersandjobStatus = 'Offen' | 'In Vorbereitung' | 'Versendet';

export interface Versandjob {
  id: number;
  veranstaltung: Veranstaltung;
  materialien: SelectedMaterial[];
  status: VersandjobStatus;
  erstelltAm: Date;
  geaendertAm: Date;
  customerId: string;
}

export interface VersandjobRequest {
  veranstaltung: Veranstaltung;
  materialien: SelectedMaterial[];
}