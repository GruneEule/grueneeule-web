# 🛠️ Beitrag zum Projekt – So geht’s richtig

Willkommen bei tWfEE (This Website. For Everyone. Everywhere.)!
Damit alles stabil und sicher bleibt, folgen wir einem strukturierten Entwicklungs-Workflow.
**Bitte halte dich an die folgenden Schritte, wenn du Änderungen einreichen möchtest.**

---

## 🧭 Übersicht – So läuft es ab:

1. 🔁 Repository forken
2. 🛠️ Änderungen lokal machen
3. 📤 Eine PullRequest (PR) gegen `development` erstellen
4. 🔍 Admin-Review abwarten
5. ✅ Merge durch Admin, wenn alles passt

---

## 📌 Voraussetzungen

* Ein GitHub-Konto
* Grundkenntnisse mit Git (lokal oder GitHub-Web-Editor)

---

## 🔁 Schritt 1: Repository forken

1. Gehe auf das Repo: [https://github.com/GruneEule/grueneeule-web](https://github.com/GruneEule/grueneeule-web)
2. Klicke oben rechts auf **Fork**
3. Wähle dein eigenes GitHub-Profil als Ziel
4. Du hast jetzt eine eigene Kopie des Repos

---

## 🛠️ Schritt 2: Änderungen machen

Arbeite in deinem eigenen Fork – entweder im Browser oder lokal mit Git.

```bash
git clone https://github.com/dein-benutzername/grueneeule-web.git
cd grueneeule-web
git checkout -b feature/meine-neue-idee
```

Füge deine Änderungen hinzu, z. B. in `index.html`, `style.css`, etc.

Dann committen:

```bash
git add .
git commit -m "Meine Änderung erklärt kurz"
git push origin feature/meine-neue-idee
```

---

## 📤 Schritt 3: Pull Request (PR) stellen

1. Gehe auf dein geforktes Repo auf GitHub
2. Es erscheint ein Banner: **"Compare & pull request"** – klick drauf
   Alternativ: Geh auf „Pull requests“ > „New pull request“
3. Ziel-Branch: `GruneEule/grueneeule-web:development`
4. Schreibe einen klaren Titel und eine kurze Beschreibung deiner Änderung
5. Erstelle die PR

---

## 🔍 Schritt 4: Warten auf Review

* Einer der **Projekt-Maintainer** wird deinen Code überprüfen.
* Es kann sein, dass du Feedback bekommst (bitte dann Änderungen nachreichen).
* Wenn alles passt, wird dein Code **gemergt**.

> ❗ **Du kannst nicht direkt in `development` oder `main` pushen** – nur über Pull Requests!

---

## 🤝 Danke fürs Mitmachen!

Dein Beitrag hilft dem Projekt weiter.
Nun kannst du dir die `Contributor` Rolle auf dem [Discord](https://grueneeule.de/l/dc) abholen!

--- 

### Wichtig: Diese Seite ist nicht zur Veröffentlichung eigener privater Projekte oder Webseiten gedacht.