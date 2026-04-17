# gitpush

Push the BetZone app to GitHub with an up-to-date README and screenshot.

## Steps

Follow these steps in order:

### 1. Take a screenshot of the app

- Use Playwright to navigate to http://localhost:3000 and take a full-page screenshot.
- Save it as `sports-betting/screenshot.png`.
- If the dev server is not running, start it first by running `sports-betting/start-server.bat` via Bash, wait a moment, then proceed.

### 2. Create or update the README

Create or overwrite `sports-betting/README.md` with the following sections:

- **Title & badge**: `# BetZone` with a live GitHub Pages badge linking to https://ivanong.github.io/sports-betting/
- **Screenshot**: embed `screenshot.png` using `![BetZone screenshot](screenshot.png)`
- **About**: one-paragraph description of BetZone — a modern sports betting PWA built with vanilla HTML/CSS/JS, no build step required
- **Features**: bullet list covering live odds ticker, bet slip with multi-selection, fractional/decimal odds toggle, balance management, offline PWA support
- **Running locally**: instructions to double-click `start-server.bat` then open http://localhost:3000
- **Tech stack**: HTML5, CSS3 (custom properties, dark theme), vanilla JS, Service Worker, Web App Manifest

### 3. Stage and commit

Stage the following files:
- `sports-betting/README.md`
- `sports-betting/screenshot.png`
- Any other modified files in `sports-betting/` (use `git status` to find them)

Commit with message:
```
update README with screenshot and feature list
```

### 4. Push to GitHub

Push to `origin main`:
```bash
cd sports-betting && git push origin main
```

If the push fails because there is no upstream, set it with:
```bash
cd sports-betting && git push -u origin main
```

Report the live URL when done: https://ivanong.github.io/sports-betting/
