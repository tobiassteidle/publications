# Kapitel 11 – Fazit & Ausblick

## Einleitung

Ursprünglich war geplant, nach Abschluss der Entwicklung einen vollständigen Erfahrungsbericht zu verfassen.  
Doch schon früh zeigte sich: Der Weg ist zu spannend, zu lehrreich und zu dynamisch, um ihn erst im Rückblick zu dokumentieren.

Daher habe ich mich entschieden, **eine Art Tagebuch bzw. Artikelserie** zu schreiben – iterativ, so wie auch die Entwicklung selbst verläuft.  
Das Projekt ist komplex, und selbst mit KI-Unterstützung wird es sich über einen längeren Zeitraum erstrecken.  
Vielleicht ergibt sich am Ende daraus auch ein kompakter "Lessons Learned"-Artikel.

---

## Aktueller Stand

Nach den ersten investierten **25 € an Claude-Code-Credits** wurde ein **funktionierender Prototyp des Frontends** erstellt.  
Die Anmeldung über das Backend mit Keycloak funktioniert ebenfalls – benötigt aber noch einen klaren **Security Review**.

Funktionale Businesslogik ist bislang noch nicht umgesetzt – aber der **technische Rahmen steht**, und das Projekt hat eine belastbare Grundlage.

---

## Persönliches Fazit

Im Internet häufen sich derzeit Berichte über sogenanntes **"Vibe-Coding"**, in denen KI als Gamechanger gefeiert wird.  
Oft verbunden mit der Frage: **Brauchen wir in Zukunft überhaupt noch Softwareentwickler?**

**Meine kurze Antwort:**  
*Jein.*  
Ja, es ist inzwischen durchaus möglich, **ohne tiefere Programmierkenntnisse funktionierende Anwendungen zu bauen**.  
Aber: Entwickler – vor allem **erfahrene** – werden **dringender denn je gebraucht.**

**Die lange Antwort:**

Die Arbeit mit Coding-Agenten erinnert mich an **Schmendrick den Zauberer** aus *"Das letzte Einhorn"*.  
Am besten funktionieren sie, wenn man ihnen möglichst viel Freiheit lässt. Ich zitiere:  
> *„Magie – tu, was du willst!“*

Dann sind die Ergebnisse manchmal **beeindruckend**, schnell und erstaunlich effektiv.

Doch sobald die Anforderungen **spezifisch und komplex** werden, stößt die Magie an ihre Grenzen:
- Die Agenten benötigen engmaschige Kontrolle
- Reviews werden **obligatorisch**
- Und nicht selten ist es **schneller, Code direkt zu schreiben**, als die Anforderungen so präzise zu beschreiben, dass ein Agent sie korrekt versteht

Voraussetzung dafür ist jedoch, dass man überhaupt erkennt, **wo Probleme auftreten**.  
Ein Laie tut das oft nicht.  
Ich habe Code **nur dann manuell verändert**, wenn sich der Agent **in einer Endlosschleife festgefahren** hatte.  
Und auch jetzt enthält der Code noch zahlreiche **offene Baustellen** – **ohne Tests**, mit **unsauberen Patterns** und **unklaren Verantwortlichkeiten**.

> *Würden Sie einem solchen System Ihre Kreditkartendaten anvertrauen?*

---

## Einordnung der Entwicklerrolle

Viele unterschätzen, **wie wenig unser Job mit reinem Coden zu tun hat**.  
Architektur, Kommunikation, Sicherheitsbewertung, Debugging, Dokumentation, Deployment, Schulung – das sind die eigentlichen Tätigkeiten.

Die Rolle von KI ist hier **ambivalent**:
- Sie entlastet bei repetitiven Aufgaben
- Aber sie schafft **neue Kontroll- und Review-Bedürfnisse**
- Und sie kann – falsch eingesetzt – sogar Risiken erhöhen

Trotzdem überwiegt **für mich klar das Positive**:
- Claude Code macht mich **effizienter**
- Ich komme schneller zu sichtbaren Ergebnissen
- Und: Es **macht Spaß** damit zu arbeiten

---

## Ausblick

Ich bin gespannt, wie sich der Entwicklungsprozess weiterentwickelt – insbesondere wenn das Projekt:
- CI/CD integriert
- Funktionale Komponenten produktiv gehen
- Sicherheitsanforderungen vollständig implementiert sind

> *„Die KI nimmt mir nervige Aufgaben ab – aber leider kommen neue nervige Aufgaben hinzu.“*

Trotzdem: Ich würde es **wieder so machen** – mit Claude an der Seite.  
Aber nicht ohne Review. Nicht ohne Verantwortung. Und nicht ohne Entwickler.
