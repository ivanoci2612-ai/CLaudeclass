# BetZone

A modern sports betting PWA built with vanilla HTML, CSS, and JavaScript. No build step, no framework, no package manager required.

## Features

- Live match ticker and odds display
- Bet slip with multi-selection support
- Decimal and fractional odds formats
- $1000 starting balance with live deductions
- Offline support via service worker (PWA)
- Installable on desktop and mobile

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

## Live Demo

[https://ivanong.github.io/sports-betting/](https://ivanong.github.io/sports-betting/)

## Deploying to GitHub Pages

Double-click `deploy-to-github.bat` in File Explorer. It installs GitHub CLI via winget, authenticates via browser, creates the repo, pushes, and enables Pages automatically.

## Project Structure

```
sports-betting/
├── index.html       # Shell layout: header, ticker, 3-column grid
├── style.css        # Dark theme, CSS custom properties
├── app.js           # All state and logic (matches, bet slip, odds)
├── sw.js            # Service worker — caches assets for offline use
├── manifest.json    # PWA manifest
└── start-server.bat # One-click local server
```

## Tech Stack

- Vanilla HTML / CSS / JavaScript
- PWA (service worker + web manifest)
- No dependencies, no build tooling
