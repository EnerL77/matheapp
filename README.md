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
  api/        Vercel Serverless Function - Proxy zur OpenAI API
  vercel.json Vercel Deployment-Konfiguration (Build + Output-Verzeichnis)
```

## Lokale Entwicklung

### 1. Abhängigkeiten installieren

```bash
npm run install:all
```

### 2. Umgebungsvariable konfigurieren

```bash
cp .env.example .env
```

Trage in `.env` deinen `OPENAI_API_KEY` ein.

### 3. Dev-Server starten

```bash
npm run dev
```

Das startet `vercel dev` (Vercel CLI, ggf. `npm i -g vercel` bzw. einmalig
`vercel login`). Frontend und `/api/*`-Function laufen dabei zusammen auf
http://localhost:3000, kein separater Proxy nötig.

## Deployment (GitHub + Vercel)

1. Repository auf GitHub pushen.
2. Auf [vercel.com](https://vercel.com) ein neues Projekt anlegen und das
   Repo `EnerL77/matheapp` importieren. `vercel.json` sorgt dafür, dass
   das Frontend gebaut (`frontend/dist`) und `api/generate-exercise.ts`
   automatisch als Serverless Function bereitgestellt wird.
3. Im Vercel-Projekt unter **Settings → Environment Variables** die
   Variable `OPENAI_API_KEY` setzen (Production, Preview und Development).
4. Deploy anstoßen - Frontend und API laufen danach auf derselben Domain,
   kein CORS-Setup nötig.

## Progressive Web App

Die App lässt sich installieren, sobald sie über HTTPS ausgeliefert wird
(z. B. über die Vercel-Deployment-URL). Das Frontend enthält Manifest,
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
- Fallback-Aufgabe in der API-Function, falls die KI-Antwort fehlschlägt
