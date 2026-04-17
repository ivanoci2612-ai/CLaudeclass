# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**BetZone** — a modern sports betting PWA built with vanilla HTML/CSS/JavaScript. No build step, no framework, no package manager.

All app code lives in `sports-betting/`.

## Running locally

The app must be served over HTTP (not opened as a `file://`) for the service worker and PWA install to work.

**Quickest start — double-click in File Explorer:**
```
sports-betting/start-server.bat
```
Then open http://localhost:3000.

**Or from PowerShell:**
```powershell
powershell -ExecutionPolicy Bypass -File sports-betting/serve.ps1
```

`serve.ps1` is a zero-dependency PowerShell HTTP server on port 3000. `server.js` is an equivalent Node.js version (requires Node, which is not installed on this machine).

## Deploying to GitHub Pages

```
sports-betting/deploy-to-github.bat
```
Double-click this in File Explorer. It installs GitHub CLI via winget, authenticates via browser, creates the repo, pushes, and enables Pages automatically.

Live URL: **https://ivanong.github.io/sports-betting/**

Manual push (if gh CLI is already set up):
```bash
cd sports-betting
git push -u origin main
```

## Architecture

Everything runs in the browser — no backend required for the app itself.

- **`index.html`** — Shell layout: header, live ticker bar, 3-column grid (sidebar / match center / bet slip)
- **`style.css`** — Dark theme (`#0f1923` background, `#00e676` accent). CSS custom properties for all colors in `:root`
- **`app.js`** — All state and logic. Key pieces:
  - `matches[]` and `leagues[]` arrays — hardcoded data, no API
  - `betSlip{}` object — keyed by `matchId+outcome`, holds stake and odds per selection
  - `renderMatches()` / `renderSlip()` — full re-render on every state change (no virtual DOM)
  - `oddsFormat` state (`decimal` | `fractional`) — `displayOdds()` converts on the fly
  - `balance` — starts at $1000, deducted on `placeBet()`
- **`sw.js`** — Caches all 6 static assets for offline use. Cache key `betzone-v1`
- **`manifest.json`** — PWA manifest; `start_url: ./index.html`, SVG icon

## Environment notes

- No Node.js or Python installed — use PowerShell scripts for local serving
- Git is installed at `C:\Program Files\Git`
- GitHub username: `ivanong`
- Git remote: `https://github.com/ivanong/sports-betting.git`
