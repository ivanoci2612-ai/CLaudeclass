# BetZone

![PWA](https://img.shields.io/badge/PWA-enabled-5A0FC8?logo=pwa&logoColor=white)
![Vanilla JS](https://img.shields.io/badge/Vanilla-JavaScript-F7DF1E?logo=javascript&logoColor=black)
![No Dependencies](https://img.shields.io/badge/dependencies-none-brightgreen)
![GitHub Pages](https://img.shields.io/badge/Deployed-GitHub%20Pages-222?logo=github)

> A modern, dark-themed sports betting PWA — no framework, no build step, runs entirely in the browser.

**Live demo:** [https://ivanong.github.io/sports-betting/](https://ivanong.github.io/sports-betting/)

---

## Screenshots

![BetZone App](betzone-live.png)

| Match Center | Bet Slip |
|---|---|
| Live odds across 4 sports, filterable by league | Multi-selection slip with real-time payout preview |

---

## Features

| Feature | Detail |
|---|---|
| Live match ticker | Scrolling bar showing in-progress scores |
| Multi-sport coverage | Football, Basketball, Tennis, Cricket |
| Odds formats | Toggle between Decimal and Fractional on the fly |
| Bet slip | Add/remove selections, set stake, see potential payout |
| Balance tracking | Starts at $1,000 — deducted on each confirmed bet |
| Offline support | Service worker caches all assets for offline use |
| PWA installable | Add to home screen on desktop and mobile |

---

## Sports & Leagues

```
Football       Basketball    Tennis        Cricket
─────────────  ────────────  ────────────  ─────────────────
Premier League NBA           ATP Tour      IPL
Champions Lg.
La Liga
Bundesliga
Serie A
```

---

## Architecture

```mermaid
graph TD
    A[index.html\nShell & Layout] --> B[app.js\nState & Logic]
    A --> C[style.css\nDark Theme]
    B --> D[matches array\n14 fixtures · 4 sports]
    B --> E[betSlip object\nkeyed by matchId+outcome]
    B --> F[renderMatches\nfull re-render on state change]
    B --> G[renderSlip\nfull re-render on state change]
    B --> H[displayOdds\ndecimal ↔ fractional converter]
    A --> I[sw.js\nService Worker]
    I --> J[betzone-v1 cache\n6 static assets]
    A --> K[manifest.json\nPWA config]
```

---

## Data at a Glance

```mermaid
pie title Matches by Sport
    "Football" : 10
    "Basketball" : 2
    "Tennis" : 1
    "Cricket" : 1
```

```mermaid
pie title Live vs Upcoming
    "Live" : 6
    "Upcoming" : 8
```

---

## Running Locally

The app must be served over HTTP (not opened as a `file://`) for the service worker and PWA install to work.

**Quickest start — double-click in File Explorer:**

```
start-server.bat
```

Then open [http://localhost:3000](http://localhost:3000).

**Or from PowerShell:**

```powershell
powershell -ExecutionPolicy Bypass -File serve.ps1
```

`serve.ps1` is a zero-dependency PowerShell HTTP server on port 3000.

---

## Deploying to GitHub Pages

Double-click `deploy-to-github.bat`. It installs GitHub CLI via winget, authenticates via browser, creates the repo, pushes, and enables Pages automatically.

---

## Project Structure

```
sports-betting/
├── index.html          Shell layout — header, ticker, 3-column grid
├── style.css           Dark theme (#0f1923 bg, #00e676 accent), CSS vars
├── app.js              All state & logic (matches, bet slip, odds)
├── sw.js               Service worker — offline cache (betzone-v1)
├── manifest.json       PWA manifest — SVG icon, start_url
├── start-server.bat    One-click PowerShell HTTP server
└── serve.ps1           Zero-dependency server script (port 3000)
```

---

## Tech Stack

- **HTML / CSS / JavaScript** — zero dependencies, no transpilation
- **PWA** — service worker + web app manifest
- **PowerShell** — local dev server (no Node or Python required)
