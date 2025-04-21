# Kapitel 2 – Projektüberblick

## Ausgangssituation beim Kunden

Der Kunde betreibt eine interne Lagerverwaltungssoftware, in der Werbemittel, Messeequipment, Mobiliar und weitere Materialien für unterschiedliche Endkunden verwaltet werden. Diese Software ist eine individuelle Eigenentwicklung und läuft ausschließlich im lokalen Firmennetzwerk. Ein externer Zugriff über das Internet ist aus Sicherheits- und Datenschutzgründen nicht vorgesehen.

Bislang erfolgt die Kommunikation mit Kunden größtenteils manuell: Kunden rufen an oder schicken Mails, um Material für Veranstaltungen zu reservieren oder versenden zu lassen. Dies führt zu hohem Abstimmungsaufwand, Fehleranfälligkeit und eingeschränkter Nachvollziehbarkeit.

## Ziel der Webanwendung

Ziel ist es, diesen Prozess zu digitalisieren und den Kunden eine moderne, selbstbedienbare Oberfläche zur Verfügung zu stellen. Die Webanwendung soll es ermöglichen, jederzeit und ortsunabhängig:

- **Versandjobs zu erstellen**, z. B. für Messen oder Events
- **Veranstaltungszeitraum und -ort** anzugeben
- Aus dem individuell eingelagerten **Materialbestand Artikel auszuwählen**
- Den Warenkorb abzusenden und den **Versand zu beauftragen**

Nach der Auftragserstellung kümmert sich der Kunde um Verpackung, Versand und Zustellung des Materials.

## Nutzerrollen & Use Case

Die Anwendung richtet sich ausschließlich an Geschäftskunden, die bereits über eingelagerte Materialien verfügen. Jede*r Benutzer*in gehört zu einem bestimmten Mandanten (Kunde) und soll ausschließlich die eigenen Daten sehen und verwalten dürfen.

Typischer Ablauf:
1. Login über Webanwendung
2. Übersicht über bestehende Versandjobs
3. Erstellung eines neuen Versandjobs (Datum, Ort)
4. Auswahl von Material aus dem Bestand
5. Absenden des Auftrags

## Nichtfunktionale Anforderungen

Neben der Funktionalität gab es weitere wichtige Anforderungen:

- **Sicherheit:** Zugriff nur nach Authentifizierung; klare Trennung der Daten zwischen Mandanten
- **Kostenoptimierung:** Hosting soll ressourcenschonend erfolgen, z. B. durch kombinierten Docker-Container für Frontend + Backend
- **Modularität & Wartbarkeit:** Die Anwendung soll iterativ erweiterbar bleiben
- **Zukunftsfähigkeit:** Schnittstellen zur Lagerverwaltungssoftware und zum internen Warenwirtschaftssystem sollen über eine Synchronisierung angebunden werden – sind jedoch nicht Bestandteil des ersten Umsetzungsschritts (MVP)
