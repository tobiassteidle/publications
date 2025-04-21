# Entwicklungsumgebung einrichten

Diese Anleitung beschreibt die Schritte zum Starten der Entwicklungsumgebung mit Keycloak und PostgreSQL.

## Voraussetzungen

- Docker und Docker Compose installiert
- Git Repository geklont

## Entwicklungsumgebung starten

1. Navigiere zum Projektverzeichnis

2. Starte die Docker-Container:

```bash
docker-compose up -d
```

3. Prüfe, ob die Container erfolgreich gestartet wurden:

```bash
docker-compose ps
```

## Keycloak konfigurieren

### Automatische Konfiguration

Das Repository enthält ein Skript zur automatischen Konfiguration von Keycloak:

```bash
chmod +x keycloak-setup.sh
./keycloak-setup.sh
```

Das Skript erstellt:
- Ein neues Realm "deka"
- Einen Client "deka-client" mit dem Secret "your-client-secret"
- Einen Testbenutzer "testuser" mit dem Passwort "password"

Nach der Ausführung des Skripts muss das Client-Secret in der `application-local.yml` eingetragen werden:

```yaml
spring:
  security:
    oauth2:
      client:
        registration:
          keycloak:
            client-secret: your-client-secret
```

### Manuelle Konfiguration

Alternativ kann Keycloak auch manuell konfiguriert werden:

1. Zugriff auf die Keycloak Admin Console:
   - URL: http://localhost:8081/admin
   - Zugangsdaten:
     - Benutzername: admin
     - Passwort: admin

2. Neues Realm erstellen:
   - Name: deka
   - Aktiviert: Ja

3. Client erstellen:
   - Client ID: deka-client
   - Client Protocol: openid-connect
   - Access Type: confidential
   - Root URL: http://localhost:4200
   - Valid Redirect URIs: 
     - http://localhost:8080/api/auth/callback
   - Web Origins: 
     - http://localhost:4200
     - http://localhost:8080

4. Client Secret notieren:
   - Gehe zu Clients → deka-client → Credentials
   - Das Secret in die application-local.yml Datei eintragen

5. Benutzer erstellen:
   - Username: testuser
   - Email: test@example.com
   - First Name: Test
   - Last Name: User
   - Passwort: password (temporär: Nein)

## Zugriff auf PostgreSQL

- Host: localhost
- Port: 5432
- Datenbank: keycloak
- Benutzername: keycloak
- Passwort: password

## Anwendung starten

1. Backend starten:

```bash
cd backend
./mvnw spring-boot:run -Dspring-boot.run.profiles=local
```

2. Frontend starten:

```bash
cd frontend
npm start
```

Das Frontend verwendet eine Proxy-Konfiguration, die alle Anfragen an `/api` automatisch an das Backend (http://localhost:8080) weiterleitet. Die Konfiguration ist in `src/proxy.conf.json` definiert und in `angular.json` eingebunden.

## Authentifizierungsflow

Die Anwendung verwendet den OAuth2 Authorization Code Flow mit Keycloak genau wie in docs/auth-flow.md beschrieben:

1. Der Benutzer klickt auf "Anmelden" im Frontend
2. Das Frontend leitet zum Backend-Endpunkt `/api/auth/login` weiter
3. Das Backend startet den OAuth2 Authorization Code Flow und leitet zu Keycloak weiter
4. Nach erfolgreicher Anmeldung bei Keycloak wird der Code ans Backend gesendet
5. Das Backend tauscht den Authorization Code gegen ein Token und erstellt eine Session
6. Die Tokens werden ausschließlich im Backend gespeichert
7. Das Backend setzt ein HttpOnly-Cookie und leitet zum Frontend-Dashboard weiter
8. Alle weiteren Anfragen verwenden das Cookie für die Authentifizierung

**Wichtig**: 
- Alle Frontend-Routen außer `/login` erfordern eine gültige Authentifizierung
- Es gibt keine Mock-Authentifizierung mehr - alle Authentifizierungsvorgänge laufen über Keycloak
- Die korrekte Redirect-URI in Keycloak muss exakt `http://localhost:8080/api/auth/callback` sein

## Entwicklungsumgebung stoppen

```bash
docker-compose down
```

Um auch die persistenten Daten zu löschen:

```bash
docker-compose down -v
```
