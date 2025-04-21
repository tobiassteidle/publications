import { Versandjob } from '../models/versandjob.model';
import { MOCK_MATERIALS } from './materials';

export const MOCK_VERSANDJOBS: Versandjob[] = [
  {
    id: 1001,
    veranstaltung: {
      name: 'Deka Investmentfonds Roadshow',
      beschreibung: 'Präsentation der neuen Investmentfonds für das kommende Jahr',
      von: new Date('2025-06-10'),
      bis: new Date('2025-06-12'),
      strasse: 'Mainzer Landstraße 16',
      plz: '60325',
      ort: 'Frankfurt am Main',
      kontaktperson: 'Max Mustermann',
      kontakttelefon: '+49 69 71470',
      kontaktemail: 'max.mustermann@deka.de'
    },
    materialien: [
      { ...MOCK_MATERIALS[0], mengeSelected: 2 },
      { ...MOCK_MATERIALS[2], mengeSelected: 10 }
    ],
    status: 'Offen',
    erstelltAm: new Date('2025-04-15T14:30:00'),
    geaendertAm: new Date('2025-04-15T14:30:00'),
    customerId: '1'
  },
  {
    id: 1002,
    veranstaltung: {
      name: 'Sparkassen Finanzierungs-Event',
      beschreibung: 'Beratungsveranstaltung zu Immobilienfinanzierung',
      von: new Date('2025-05-05'),
      bis: new Date('2025-05-05'),
      strasse: 'Kaiserstraße 36',
      plz: '60329',
      ort: 'Frankfurt am Main',
      kontaktperson: 'Max Mustermann',
      kontakttelefon: '+49 69 71470',
      kontaktemail: 'max.mustermann@deka.de'
    },
    materialien: [
      { ...MOCK_MATERIALS[1], mengeSelected: 5 },
      { ...MOCK_MATERIALS[3], mengeSelected: 20 }
    ],
    status: 'In Vorbereitung',
    erstelltAm: new Date('2025-03-22T09:15:00'),
    geaendertAm: new Date('2025-04-01T11:20:00'),
    customerId: '1'
  },
  {
    id: 1003,
    veranstaltung: {
      name: 'Vorsorge-Workshop',
      beschreibung: 'Informationsveranstaltung zum Thema Altersvorsorge',
      von: new Date('2025-04-10'),
      bis: new Date('2025-04-10'),
      strasse: 'Berliner Allee 33',
      plz: '40212',
      ort: 'Düsseldorf',
      kontaktperson: 'Max Mustermann',
      kontakttelefon: '+49 69 71470',
      kontaktemail: 'max.mustermann@deka.de'
    },
    materialien: [
      { ...MOCK_MATERIALS[4], mengeSelected: 3 },
      { ...MOCK_MATERIALS[2], mengeSelected: 15 }
    ],
    status: 'Versendet',
    erstelltAm: new Date('2025-03-01T10:40:00'),
    geaendertAm: new Date('2025-03-15T16:30:00'),
    customerId: '1'
  }
];