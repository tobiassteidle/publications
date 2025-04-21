# Kapitel 5 – Entwicklung mit Claude Code: Allgemeiner Ablauf

## Arbeitsumgebung & Setup

Die Entwicklung erfolgte vollständig unter **WSL2 (Windows Subsystem for Linux)**, um eine Linux-nahe Umgebung für Docker, Java, Node.js und weitere Tools zu gewährleisten.  
Als zentrales Entwicklungswerkzeug kam **Claude Code** zum Einsatz – ein KI-gesteuerter Entwicklungsagent, der auf natürliche Sprache reagiert und vollständige Projektstrukturen, Komponenten oder Implementierungen vorschlagen und umsetzen kann.

**Setup-Schritte:**
- Installation von Claude Code unter WSL2
- Anlegen des Projektverzeichnisses mit `README.md` und `CLAUDE.md`
- Erwerb erster Credits zur Freischaltung produktiver Features
- Initialisierung des Projekts über den Befehl `/init`

## Erste Schritte mit Claude

Claude Code erzeugte nach `/init` die grundlegende Projektstruktur – getrennt in:
- Angular-Frontend
- Spring Boot Backend
- Dockerfiles für Build und Deployment

Die erste positive Erfahrung: **Claude fragt vor jedem Eingriff nach Bestätigung**.  
Ein Problem zeigte sich früh: Claude erkannte das Arbeitsverzeichnis nicht korrekt. Erst nachdem das Verzeichnis explizit in der Datei `CLAUDE.md` hinterlegt wurde, konnte die KI zuverlässig arbeiten.

## Entwicklungsstil & Strategie

Die erste Phase der Entwicklung war geprägt vom Prinzip:

> **“Gib der KI so viel Freiheit wie möglich, greif nur ein, wenn nötig.”**

Das Ziel war nicht nur ein lauffähiges Ergebnis – sondern die Beobachtung, **wie Claude Entscheidungen trifft, welche Kompromisse es eingeht und wie stabil das Resultat in späteren Iterationen bleibt.**

Konkrete Strategie:
- **Grundstruktur vollständig durch Claude erstellen lassen**
- **Erst nach Generierung eingreifen und überarbeiten**
- Nur wenn Claude sich „verrennt“, erfolgt manuelles Korrigieren oder ein kompletter Rückschritt zur letzten stabilen Version

## Beobachtungen zur Claude-Arbeitsweise

**Stärken:**
- Rasche Erzeugung komplexer Projektstrukturen
- Solide Vorschläge bei einfachen Komponenten
- Korrekte Verwendung gängiger Frameworks (Angular CLI, Spring Boot Initializer)
- Gutes Verständnis von modularen Projekten

**Schwächen:**
- Eingeschränktes Verzeichnis- und Kontextverständnis
- Tendenz, bei Iterationen **funktionierende Strukturen zu überschreiben**
- **Unzuverlässigkeit bei sicherheitskritischen Änderungen** (z. B. Auth-Flows, Tokenhandling)
- Manchmal unsinnige oder unerwünschte Vorschläge, z. B.:
  - komplette Projekt-Neugenerierung wegen einer fehlenden Angular-Dependency
  - Umbenennung von UI-Elementen ohne Auftrag

## 🧭 Iterationsverlauf: Claude Code im Alltag

| **Iteration** | **Aktion / Ziel**                                | **Verhalten von Claude Code**                                                                 | **Eingriff notwendig?** | **Ergebnis / Learning**                                                                 |
|---------------|--------------------------------------------------|-----------------------------------------------------------------------------------------------|--------------------------|------------------------------------------------------------------------------------------|
| 1             | Projekt initialisieren (`/init`)                | Struktur wurde sauber angelegt (Angular, Spring Boot, Docker)                                | Nein                     | Positiver Start, Grundstruktur vollständig ohne Eingriff                                |
| 2             | Frontend starten                                | Abhängigkeiten fehlten, u. a. `@angular-devkit/architect`                                     | Ja                      | Claude schlug Neuaufbau vor – manuelles `npm install` war zielführender                 |
| 3             | Mockdaten aktivieren                            | Mockdaten wurden eingebunden, UI funktionierte grundlegend                                   | Nein                     | Gute Vorlage für UI, zeigt sinnvolle Platzhalter und Listen                             |
| 4             | CI-Farbanpassung an Kundenwebseite              | Optik wurde angepasst – **Navigation wurde dabei zerstört**                                  | Ja                      | Warnsignal: Visuelle Änderungen beeinflussen Code-Struktur                              |
| 5             | Frontend-Navigation reparieren                  | Claude verstand Ursache nicht, versuchte mehrfaches Refactoring                              | Ja                      | Navigation wurde manuell repariert                                                      |
| 6             | Auth-Flow integrieren                           | Flow wurde teilweise aufgebaut, **Mock-Login blieb bestehen**, kein echter OIDC-Redirect     | Ja                      | Authentifizierung erfordert klaren technischen Rahmen und starkes Review                |
| 7             | Auth-Probleme fixieren                          | Auth-Code wurde versehentlich ins Frontend eingebaut – klare Verletzung des Sicherheitsmodells | Ja                    | Kritischer Punkt: Claude greift in sensible Architekturbereiche ein                     |
| 8             | Projekt wieder stabilisieren                    | Manuelle Rückführung zur letzten funktionierenden Iteration                                  | Ja                      | Claude „vergisst“ gelegentlich vorherige Fixes – Versionierung ist Pflicht              |
