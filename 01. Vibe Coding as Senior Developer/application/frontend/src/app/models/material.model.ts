export interface Material {
  id: number;
  name: string;
  description: string;
  artikelnummer: string;
  laenge: number; // in cm
  breite: number; // in cm
  tiefe: number; // in cm
  menge: number;
  mengeVerfuegbar: number;
  bildBase64?: string | null;
  customerId: string;
}

export interface SelectedMaterial extends Material {
  mengeSelected: number;
}