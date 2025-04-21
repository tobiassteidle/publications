# Kapitel 8 – Authentifizierungs-Flow: Erwartung vs. Realität

## Geplanter Authentifizierungs-Flow

Die Authentifizierung wurde von Anfang an als sicherheitskritisches Element betrachtet. Vorgabe war ein **OAuth2 Authorization Code Flow mit Keycloak**, bei dem:

- **Kein Token im Frontend gespeichert** wird
- **Das Backend das gesamte Tokenhandling übernimmt**
- Der Benutzer nach erfolgreicher Authentifizierung **ein sicheres Cookie** (`auth_sid`) erhält
- Das Backend bei jedem Request den **Benutzerkontext validiert**
- Eine Trennung zwischen Authentifizierung, Autorisierung und Datenzugriff eingehalten wird

Das Ziel war eine Architektur, bei der Sicherheit nicht „nachträglich eingebaut“, sondern von Anfang an **zentraler Bestandteil** ist.

## Umsetzung durch Claude Code

Bereits bei der ersten Iteration zeigte sich, dass Claude Code mit **komplexeren Authentifizierungsflüssen** überfordert war:

- Der **Mock-Login wurde nicht entfernt**, obwohl mehrfach aufgefordert
- Es wurde kein vollständiger Redirect zu Keycloak umgesetzt
- Der **Access Token wurde im Frontend verarbeitet**, entgegen der Sicherheitsvorgaben
- Auth-Code wurde in manchen Fällen **fälschlicherweise an das Frontend übergeben**

Selbst nach mehreren Iterationen mit präzisen Anweisungen wurde der Auth-Flow **nicht korrekt umgesetzt**. Teilweise wurden bereits funktionierende Teile wieder überschrieben oder beschädigt.

> *„Ich hatte das Gefühl, ich kämpfe nicht nur mit der technischen Komplexität, sondern auch mit der KI selbst.“*

## Sicherheitsrelevante Verstöße

Die folgenden Punkte wurden als **kritisch eingestuft**:

- **Token im Frontend sichtbar/verarbeitet**
- **Auth-Code Weitergabe an den Client**
- **Fehlende zentrale Sicherheitskonfiguration im Backend**
- **Fehlende Trennung von Login und Benutzerkontext**
- **Fehlende Mandantenprüfung in geschützten Endpunkten**

Diese Fehler wären in einer echten Produktionsumgebung **nicht tragbar**. Sie zeigen, dass Claude zwar syntaktisch richtigen Code generieren kann, aber **kein kontextuelles Sicherheitsverständnis** besitzt.

## Fazit & Bewertung

Die Integration einer sicheren Authentifizierung ist ein Paradebeispiel dafür, **wo automatisierte Agenten derzeit noch an ihre Grenzen stoßen**:

- Claude Code kann bei der **technischen Vorbereitung unterstützen** (z. B. Keycloak-Anbindung vorbereiten)
- Aber: Der **komplette Authentifizierungs-Flow muss manuell geplant, geprüft und abgesichert werden**
- Besonders bei Mandantentrennung und rollenbasiertem Zugriffsschutz ist ein Review durch erfahrene Entwickler **unverzichtbar**

> *„Sicherheit ist kein Feature – sie ist das Fundament. Claude hat dieses Fundament leider mehrfach untergraben.“*
