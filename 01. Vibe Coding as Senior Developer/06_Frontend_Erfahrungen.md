# Kapitel 6 – Erfahrungen im Frontend

## Positive Aspekte

Trotz der Herausforderungen in späteren Phasen war der erste Eindruck des durch Claude Code generierten Angular-Frontends **durchweg positiv**:

- **Strukturell solide Grundlage:** Das Projekt war übersichtlich aufgebaut, die Komponenten und Module folgten erkennbaren Angular-Konventionen.
- **Gute CI-Anpassung bei wenig Vorgaben:** Auch ohne konkrete Styleguides wurde ein ansprechendes UI erzeugt, das optisch bereits grob zur CI des Kunden passte.
- **Mockdaten funktionierten direkt:** Die eingebundene Materialliste mit Beispieldaten ermöglichte es, die Kernfunktionen wie Auswahl und Warenkorb bereits früh zu demonstrieren.
- **Schneller Fortschritt:** Im Vergleich zur klassischen Entwicklung war der initiale Aufbau wesentlich schneller.

> *„Ohne das Mock-Login und mit etwas Styling wäre das bereits ein solider Prototyp gewesen.“*

## Negative Aspekte & Probleme

Mit fortschreitender Entwicklung traten zunehmend **technische und strukturelle Probleme** im Frontend auf – insbesondere dann, wenn Claude Code mehrfach iterativ Anweisungen erhielt:

### Technische Schwierigkeiten
- **Fehlende oder veraltete Dependencies:** Der initiale Start schlug fehl, da Bibliotheken wie `@angular-devkit/architect` fehlten oder `angular.json` veraltete Keys wie `browserTarget` enthielt.
- **Mock-Login wurde nicht entfernt:** Trotz mehrmaliger Aufforderung blieb der ursprüngliche Platzhalter bestehen, was sich mit dem Authentifizierungsansatz widersprach.
- **OAuth2-Flow nicht umgesetzt:** Der korrekte Redirect zu Keycloak wurde ignoriert. Stattdessen wurde versucht, Login-Informationen lokal zu verarbeiten – ein klarer Verstoß gegen das Sicherheitskonzept.

### Unerwünschte Änderungen
- **Funktionierende Navigation wurde „kaputt repariert“:** Nach einer visuellen Anpassung (Farben im Sinne der CI) funktionierte die Navigation plötzlich nicht mehr – jeder Klick führte auf die Login-Seite.
- **UI-Elemente wurden eigenmächtig umbenannt oder verschoben**, z. B. Buttons mit neuen Beschriftungen ohne fachlichen Anlass.
- **Optik vor Funktion:** Claude priorisierte UI-Änderungen teils über funktionale Stabilität – problematisch für ein sicherheitsrelevantes Projekt.

## Zusammenfassung

Die Frontend-Entwicklung mit Claude Code zeigt, dass der Agent in der Lage ist, **schnell ein funktionales und ästhetisch brauchbares Grundgerüst zu erstellen**. Allerdings wird in späteren Iterationen deutlich:

- **Claude hat kein stabiles „Gedächtnis“** für vorherige funktionierende Zustände
- Es fehlt ein zuverlässiges Verständnis für **Zusammenhänge zwischen UI, Routing und Authentifizierung**
- Ohne Review und manuelles Testing ist **keine konsistente Weiterentwicklung möglich**
