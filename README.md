# Davids Mathe App 🧮

Eine Mathe-Lern-App für Klasse 1–6. Schüler:innen wählen ihre Klasse, üben
Themen aus dem Lehrplan und erhalten von der OpenAI API generierte
Übungsaufgaben mit Erklärung und Tipp. Fortschritt, XP, Level, Streaks,
Münzen und Abzeichen werden lokal im Browser gespeichert. Ein Elternbereich
zeigt den Lernfortschritt und erlaubt das Zurücksetzen.

## Projektstruktur

```
mathe-app/
  frontend/   React + Vite + TypeScript (UI)
  backend/    Express.js API-Proxy zur OpenAI API
  render.yaml Render Deployment-Konfiguration (Static Site + Web Service)
```

## Lokale Entwicklung

### 1. Abhängigkeiten installieren

```bash
npm run install:all
```

### 2. Backend konfigurieren

```bash
cp backend/.env.example backend/.env
```

Trage in `backend/.env` deinen `OPENAI_API_KEY` ein.

### 3. Beide Server starten

```bash
npm run dev
```

- Frontend: http://localhost:5173 (Vite, proxyt `/api/*` zu Backend)
- Backend: http://localhost:3002

## Deployment (GitHub + Render)

1. Repository auf GitHub pushen.
2. In Render ein neues **Blueprint** anlegen und das Repo auswählen –
   `render.yaml` legt automatisch zwei Services an:
   - `mathe-app-backend` (Web Service, Node)
   - `mathe-app-frontend` (Static Site)
3. Für `mathe-app-backend` die Umgebungsvariable `OPENAI_API_KEY` setzen
   (Render fragt danach, da `sync: false`).
4. Für `mathe-app-backend` die Umgebungsvariable `FRONTEND_URL` auf die
   URL der Frontend-Static-Site setzen (z. B.
   `https://mathe-app-frontend.onrender.com`), damit CORS funktioniert.
5. Render baut und deployed beide Services automatisch. Das Frontend
   erhält `VITE_API_URL` automatisch vom Backend-Service (Hostname).

## Progressive Web App

Die App lässt sich installieren, sobald sie über HTTPS ausgeliefert wird
(z. B. über die Render-Deployment-URL). Das Frontend enthält Manifest,
Icons und einen Service Worker (`vite-plugin-pwa`), der die App-Shell
offline verfügbar macht und Updates automatisch nachlädt. Die von der
OpenAI API gelieferten Aufgaben werden bewusst **nicht** gecacht
(`NetworkOnly` für `/api/*`), damit nie veraltete Aufgaben angezeigt werden.

- **Android/Desktop Chrome & Edge:** Adressleiste → Installieren-Symbol
  bzw. Menü → „App installieren".
- **iOS/iPadOS Safari:** Teilen-Symbol → „Zum Home-Bildschirm".

## Funktionen

- 18 Themen aus dem Lehrplan Klasse 1–6 (Addition, Einmaleins, Brüche,
  Prozentrechnung, Geometrie, u. v. m.)
- Von OpenAI generierte Aufgaben, Schwierigkeit passt sich dem Fortschritt an
- 5 Aufgaben pro Runde, 3 Leben, Tipps, Erklärungen
- XP, Level, Tages-Streak, Münzen, Abzeichen
- Profilansicht mit Fortschritt pro Thema
- Elternbereich mit Gesamtübersicht und Reset-Funktion
- Fallback-Aufgabe im Backend, falls die KI-Antwort fehlschlägt
