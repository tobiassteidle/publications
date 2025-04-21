# Kapitel 4 – Techstack & Entscheidungen

## Auswahl der Technologien

Die Wahl des Techstacks basierte auf zwei zentralen Faktoren: vorhandenes Know-how und Praxistauglichkeit im Hinblick auf Performance, Wartbarkeit und Kosten.

### Frontend: Angular
Angular wurde als Frontend-Technologie gewählt, weil:
- bereits **Erfahrung mit dem Framework vorhanden** ist,
- es eine klare Struktur und **gut wartbare Architektur** bietet,
- es sich gut für **Enterprise-UI** eignet,
- und die Integration mit OAuth2 und REST gut dokumentiert ist.

### Backend: Spring Boot
Spring Boot kam als Backend-for-Frontend (BFF) zum Einsatz, da es:
- in zahlreichen Projekten bewährt ist,
- ein **starkes Security-Ökosystem** (Spring Security, Keycloak Adapter) bietet,
- **schnell konfigurierbar** ist (Annotation-based),
- eine **saubere REST-API-Definition** ermöglicht,
- und hervorragend mit PostgreSQL, Keycloak & Docker zusammenspielt.

### Authentifizierung: Keycloak
Die Entscheidung fiel auf Keycloak, weil:
- es als **Open-Source-Identitätslösung** etabliert ist,
- es **OAuth2/OIDC vollständig unterstützt**,
- es leicht in Spring Boot integrierbar ist,
- Benutzer- und Rechteverwaltung auch **mandantenfähig** abbildbar sind,
- alternative Anbieter (Auth0, Ory, FusionAuth) entweder komplexer oder kostenpflichtig sind.

### Datenbank: PostgreSQL
PostgreSQL wurde aufgrund seiner Stabilität, JSON-Funktionalität, Open-Source-Lizenz und **Docker-Tauglichkeit** eingesetzt. Es ist robust, performant und für relationale Daten sehr gut geeignet.

## Begründung der Architekturentscheidungen

- **Modularität & Skalierbarkeit:** Trennung in Frontend, BFF, Auth und DB erlaubt zukünftige Skalierung oder Austausch einzelner Komponenten.
- **Kostenoptimierung:** Das Ziel war ein möglichst einfacher Betrieb – deshalb werden Frontend & BFF **im selben Docker-Container ausgeliefert**.
- **Langfristige Erweiterbarkeit:** Durch klare Architekturtrennung lassen sich in späteren Phasen Daten-Synchronisation, Benutzerverwaltung oder Admin-Module integrieren.
