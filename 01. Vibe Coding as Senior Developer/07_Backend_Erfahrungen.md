# Kapitel 7 – Erfahrungen im Backend

## Positive Aspekte

Das durch Claude Code generierte Spring Boot Backend war **überraschend stabil und praxisnah** – gerade im Vergleich zur instabileren Frontend-Logik:

- **Start ohne nennenswerte Probleme:** Bereits nach der Generierung konnte das Backend gestartet werden – bis auf kleinere Konflikte bei Abhängigkeiten (z. B. `commons-logging`).
- **Saubere Grundstruktur:** Controller, Services und Datenzugriff waren gut voneinander getrennt. Die Namenskonventionen wirkten nachvollziehbar.
- **Schnelle API-Bereitstellung:** Endpunkte für Versandjobs und Materialverwaltung wurden schnell erstellt und waren grundsätzlich lauffähig.
- **Mock-Daten im Backend:** Claude bot in frühen Versionen sinnvolle In-Memory-Datenmodelle an, was den MVP-Start erleichterte.

> *„Das Backend sah auf den ersten Blick aus wie von einem Junior-Entwickler mit guter Anleitung erstellt – das ist eigentlich gar nicht schlecht.“*

## Negative Aspekte & Probleme

Während die Basiskonstruktion stimmte, wurden im weiteren Verlauf **zunehmend strukturelle und sicherheitsrelevante Probleme** deutlich:

### Inkonsistenter Coding-Style
- **Lombok wurde nicht einheitlich verwendet**, obwohl dies im Projekt bevorzugt wurde.
- **Konfigurationen via `@Configuration` + `@Bean`** fehlten häufig – stattdessen wurden Komponenten manuell instanziert.
- Das Backend wirkte „zusammengestückelt“ – in späteren Iterationen **fehlte Konsistenz in der Paketstruktur**.

### Sicherheitskritische Schwächen
- **Tokenhandling wurde falsch umgesetzt:**
  - Jeder Endpunkt erwartete `@RequestHeader("Authorization")`, obwohl das Token zentral im Backend verarbeitet werden sollte.
  - Teilweise wurde sogar versucht, **den Auth-Code im Frontend zu verarbeiten**, was dem Sicherheitskonzept fundamental widerspricht.
- **Einbindung verwundbarer Bibliotheken** (Dependencies mit bekannten CVEs), z. B. ältere Versionen von Keycloak-Adapter.
- Keine zentrale Spring-Security-Konfiguration, sondern inkonsistente Absicherung auf Controller-Ebene.

### Wiederkehrende Fehler
- **Fehler wurden in späteren Iterationen erneut eingeführt**, obwohl sie bereits behoben waren.
- Claude „vergaß“ teilweise eigene Lösungen oder überschieb wichtige Korrekturen bei neuen Prompts.

## Zusammenfassung

Die Backend-Generierung war **solide im Aufbau**, jedoch **nicht nachhaltig wartbar ohne aktives Review**:

- Claude generiert nachvollziehbaren Code, **aber kein einheitliches Systemdesign**
- Sicherheitsrelevante Themen wie Tokenhandling, Sessionkontrolle und Rollenprüfungen **müssen zwingend manuell geprüft werden**
- **Agentenlogik ist nicht „architekturtreu“** – es braucht klare Vorgaben und eine Review-Schicht durch erfahrene Entwickler
