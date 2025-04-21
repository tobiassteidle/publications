# 📦 Projektbeschreibung: Deka Versandjobs

## 🎯 Ziel des Projekts

Entwicklung einer webbasierten Anwendung, mit der Kunden eingelagerte Materialien (z.B. Mobiliar, Ausstellungsmaterial, Werbebanner) für eine Veranstaltung anfordern können.  
Ein Kunde kann sich anmelden, eine Veranstaltung definieren und aus seinem individuellen Materialbestand passende Artikel auswählen. Der resultierende Versandjob wird an das Unternehmen übermittelt, das den Versand vorbereitet.

---

## 🔧 Technologiestack

| Komponente         | Technologie               |
|--------------------|---------------------------|
| **Frontend**       | Angular                   |
| **Backend (BFF)**  | Spring Boot (Java 17+)    |
| **Datenbank**      | PostgreSQL                |
| **Authentication** | Keycloak (OIDC)           |
| **Deployment**     | Docker (ein Container für Frontend + Backend) |

---

## 🧱 Funktionale Anforderungen

### 🔐 Authentifizierung & Autorisierung
- OIDC-Login über Keycloak
- Token enthält Kundenzugehörigkeit und Rechte
- Jeder Benutzer darf ausschließlich:
    - sein eigenes Material sehen
    - seine eigenen Versandjobs anlegen und verwalten

### 📦 Versandjob-Funktion
- Anlegen eines Versandjobs mit:
  - Veranstaltungsname
  - Veranstaltungsbeschreibung (optional)
  - Veranstaltungszeitraum (Datum von/bis)
  - Veranstaltungsort (frei wählbar über Adresseingabe)
- Auswahl eingelagerter Materialien (nur eigener Bestand)
  - Materialien in den Versandjob übernehmen
  - Materialien sollen aus eine Liste ausgewählt werden können
  - Materialien soll in einer Tabelle angezeigt werden
  - Es soll eine Filter- und Suchfunktion geben (z. B. nach Materialbezeichnung oder -nummer)
- Warenkorb-Funktion
- Versandjob absenden
- Versandjob-Statusanzeige („Offen", „In Vorbereitung", „Versendet")

---

## 🗂 Architektur & Komponenten

### Frontend (Angular)
- SPA mit Angular CLI erstellt
- Authentifizierung per OIDC (Keycloak)
- REST-Kommunikation mit dem Spring Boot Backend
- Wird nach Build als statischer Content im Spring Boot Container ausgeliefert (z. B. unter `/public` oder `/static`)

### Backend (Spring Boot)
- REST-API unter `/api/**`
- Authentifizierung per JWT-Token gegen Keycloak
- Zugriffsbeschränkung auf Ressourcen über Token-Claims
- Verwaltet Benutzer, Material, Versandjobs

### Datenbank (PostgreSQL)
- Kunden
- Material (kundenspezifisch)
- Versandjobs inkl. Status und Metadaten

---

## 📦 MVP – Erste Iteration

- Login über Keycloak (Mockup)
- Kunden-Dashboard nach Login
- Erstellung eines Versandjobs mit Veranstaltungsdaten
- Auswahl von Material aus dem eigenen Bestand (Daten vorerst gemockt)
- Übersicht über angelegte Versandjobs
- REST-Schnittstellen im Backend für Material & Versandjobs
- Integration von Angular + Spring Boot in einem gemeinsamen Docker-Container

---

## 🔄 Geplante Weiterentwicklungen (nach MVP)

- 🔁 Synchronisierung der Materialdaten mit lokaler Lagerverwaltungssoftware (z.B. stündlich)
- 🔃 Rückmeldung & Statusupdates von Versandjobs aus Warenwirtschaftssystem
- 🛠 Admin-UI für interne Mitarbeiter
- 🧑‍🤝‍🧑 Benutzer- und Rollenkonfiguration über Keycloak
- 📈 Reporting und Auswertungen

---

## 🛠 Technische Hinweise

- Angular Build (`ng build`) → Output kommt in `SpringBoot/src/main/resources/static`
- REST-Endpunkte vom Frontend über `/api/**` konsumiert
- Zugriffskontrolle im Backend via Token-Auswertung (Mandantensicherheit)
- Dockerfile kombiniert Angular- und Spring-Boot-Build

---

## 📁 Projektstruktur
Das Projekt wurde mit folgender Struktur aufgesetzt:

```
projekt-root/ 
├── frontend/       # Angular-App 
├── backend/        # Spring Boot App 
├── Dockerfile      # Kombinierter Container 
└── README.md       # Projektbeschreibung
```

### Setup-Anweisungen
#### Voraussetzungen
- Java 17+ für das Backend
- Node.js und Angular CLI für das Frontend
- PostgreSQL Datenbank
- Docker für Container-Build (optional)

#### Frontend starten
```bash
cd frontend
npm install
ng serve
```
Die Angular-Anwendung ist dann unter http://localhost:4200 erreichbar.

#### Backend starten
```bash
cd backend
./mvnw spring-boot:run
```
Das Spring Boot Backend ist dann unter http://localhost:8080 erreichbar.

#### Docker-Container bauen
```bash
docker build -t deka-versandjobs .
docker run -p 8080:8080 deka-versandjobs
```
Die komplette Anwendung ist dann unter http://localhost:8080 erreichbar.
