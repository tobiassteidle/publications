# Authentifizierungs- und Sitzungsmanagement-Flow mit Keycloak

## Ziel

Dieser Flow beschreibt eine sichere Authentifizierungslösung für eine Angular-Frontend-Anwendung mit einem Spring Boot Backend (Backend for Frontend – BFF), unter Verwendung von Keycloak als Identity Provider. Tokens werden ausschließlich im Backend gespeichert. Das Frontend kommuniziert mit dem Backend über einen sicheren Session-Identifier (Cookie).

---

## Komponenten

- **Frontend**: Angular SPA (Single Page Application)
- **Backend**: Spring Boot Anwendung (Backend for Frontend)
- **Identity Provider**: Keycloak
- **Session Storage**: In-Memory (z.B. Redis) oder interne Map (nur für Prototyping)

---

## Ablauf

### 1. Benutzer ruft Frontend auf

- Die Angular-App prüft beim Start, ob ein gültiges Authentifizierungs-Cookie (z. B. `auth_sid`) vorhanden ist.
- Falls nicht, leitet Angular auf einen Login-Endpunkt im Backend weiter:

```
GET /auth/login
```

---

### 2. Backend startet OAuth2 Login Flow

- Das Backend leitet den Benutzer zu Keycloak weiter mit dem OAuth2 Authorization Code Flow.
- Optional: Nutzung von PKCE zur zusätzlichen Absicherung (besonders bei SPAs empfohlen).

---

### 3. Keycloak Authentifizierung

- Der Benutzer meldet sich auf der Keycloak Loginseite an.
- Nach erfolgreicher Authentifizierung wird der Benutzer an das Backend zurückgeleitet:

```
GET /auth/callback?code=AUTH_CODE
```

---

### 4. Backend tauscht Code gegen Tokens

- Das Backend verwendet den Authorization Code, um bei Keycloak ein Access- und Refresh-Token zu erhalten.

---

### 5. Erstellung einer Session

- Das Backend generiert eine zufällige, nicht erratbare Session-ID (`auth_sid`).
- Die erhaltenen Tokens werden im Backend (z. B. Redis) unter dieser Session-ID gespeichert.
- Die Session erhält eine TTL entsprechend der Gültigkeit des Refresh-Tokens.

---

### 6. Rückgabe an den Browser

- Das Backend setzt ein Cookie:

```
Set-Cookie: auth_sid=...; HttpOnly; Secure; Path=/; SameSite=Strict
```

- Der Browser speichert dieses Cookie und sendet es bei zukünftigen Requests automatisch mit.

---

### 7. Authentifizierte Kommunikation

- Jeder Request vom Frontend an das Backend enthält das Cookie `auth_sid`.
- Das Backend:
  - Validiert das Access-Token.
  - Falls nötig, wird das Token mit dem Refresh-Token erneuert.
  - Erst danach wird die Anfrage verarbeitet und ggf. an interne Services weitergeleitet.

---

## Sicherheitshinweise

- **Tokens niemals im Browser speichern!** Nur `auth_sid`-Cookie mit `HttpOnly` und `Secure` verwenden.
- **CSRF-Schutz** durch `SameSite=Strict` oder zusätzliche Absicherung (Double Submit Token).
- **Session Management** mit kurzer Gültigkeit und Inaktivitäts-Timeout (z. B. 1 Stunde).
- **Refresh-Token Rotation** optional zur weiteren Absicherung.

---

## Vorteile dieses Verfahrens

- **Zentralisiertes Tokenhandling im Backend** – keine Token im Frontend.
- **Geringeres Risiko durch XSS** – Tokens sind nicht per JavaScript zugänglich.
- **Erweiterbar für Multi-Tenant- und Rollenbasierte Zugriffsmodelle**.
- **Kompatibel mit klassischen Session-Mechanismen und modernen OAuth2-Standards.**

---

## Nächste Schritte

- Integration von Spring Security mit OAuth2 Client.
- Aufbau einer Session-Tabelle bzw. Redis-Datenstruktur für Token-Storage.
- Angular-Interceptor zur automatischen Weiterleitung bei HTTP 401.
- Schutz der Backend-Routen über Security-Konfiguration.
