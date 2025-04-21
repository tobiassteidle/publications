# Kapitel 10 – Security Review: Checkliste & Risiken

## Einleitung

Sicherheit war von Beginn an ein zentrales Anliegen dieses Projekts. Die Webanwendung verarbeitet potenziell sensible Kunden- und Versanddaten und ist öffentlich erreichbar – damit sind **Vertraulichkeit, Integrität und Mandantenschutz** zwingende Anforderungen.

Ziel des Security Reviews war es, die von Claude Code generierten Komponenten auf sicherheitsrelevante Schwächen zu analysieren – sowohl im Code als auch im Design.

## Kritische Beobachtungen

| Kategorie         | Problemfeld                                               | Bewertung        | Beispiel/Kommentar |
|------------------|-----------------------------------------------------------|------------------|--------------------|
| **Tokenhandling**| Token wurde im Frontend verarbeitet                        | ❌ Kritisch       | Zugriff auf AccessToken im Angular-Code |
| **Auth-Flow**     | Authorization Code wurde an Frontend weitergereicht       | ❌ Kritisch       | Verstoß gegen OAuth2-Flow |
| **Session-Handling**| Kein serverseitiger Session-Mechanismus, keine Token-Erneuerung | ⚠️ Hoch         | Keine Verwendung von `HttpOnly` Cookies im Vorschlag |
| **API-Schutz**   | Kein zentraler Spring-Security-Kontext                    | ⚠️ Hoch           | Endpunkte per Annotation gesichert, aber keine globale Absicherung |
| **Mandantenschutz**| Kein automatisierter Check auf Benutzer-Mandant-Konsistenz | ❌ Kritisch     | Jeder API-Aufruf überträgt `Authorization`-Header, aber keine interne Prüfung |
| **Dependency Management**| Verwundbare Versionen eingebunden (z. B. Keycloak Starter) | ⚠️ Mittel     | Kein CVE-Check, kein SBOM |
| **CORS & Browser-Schutz** | CORS-Konfiguration fehlte oder war zu offen            | ⚠️ Mittel         | Frontend-Zugriffe waren teilweise ohne Einschränkung erlaubt |
| **Fehlertoleranz**| Fehlerausgaben nicht standardisiert (z. B. Stacktraces sichtbar) | ⚠️ Mittel    | Default Error Handler aktiv |

## Zusammenfassung der Schwachstellen

Die von Claude Code generierten Ergebnisse zeigten:
- **Kein durchgängiges Sicherheitsmodell**
- **Verletzungen grundlegender OAuth2-Prinzipien**
- **Fehlendes Verständnis für Mandantenschutz**
- **Fehlende sichere Defaults** (z. B. CORS, Session, Header-Schutz)

Dies unterstreicht, dass Claude Code aktuell **nicht in der Lage ist, sichere Webanwendungen ohne manuelle Kontrolle zu generieren.**

## Empfehlungen

- **Security by Design einfordern:** Bereits im Prompt-Design müssen Sicherheitsanforderungen explizit und wiederholt betont werden.
- **Sicherheitskritische Logik nie automatisieren lassen**: Authentifizierung, Rollenmanagement, Tokenhandling, Mandantenschutz gehören in erfahrene Entwicklerhände.
- **Review-Prozess zwingend notwendig:** Jede Änderung durch KI muss wie ein externer Code-Commit geprüft werden.
- **Automatisierte Sicherheitsanalyse einbauen** (z. B. OWASP Dependency-Check, Snyk)

## Fazit

Claude Code kann bei der Erstellung von Infrastruktur und APIs unterstützen – **nicht aber bei der Absicherung komplexer Systeme**. Das Risiko, dass Sicherheitsfehler eingeführt oder Verstöße gegen Best Practices begangen werden, ist derzeit **zu hoch für produktive Umgebungen**.

> *„Sicherheitsbewusstsein kann nicht erlernt, sondern muss eingebaut sein – Claude ist dafür (noch) nicht bereit.“*
