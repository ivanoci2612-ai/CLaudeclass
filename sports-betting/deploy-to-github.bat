@echo off
title BetZone - GitHub Deploy
cd /d "%~dp0"
color 0A

echo.
echo  ============================================
echo   BetZone ^> GitHub Pages Auto-Deploy
echo  ============================================
echo.

REM ── Step 1: Install GitHub CLI if missing ───
where gh >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo  [1/4] Installing GitHub CLI...
    winget install --id GitHub.cli --silent --accept-package-agreements --accept-source-agreements
    if %ERRORLEVEL% NEQ 0 (
        echo.
        echo  ERROR: Could not install GitHub CLI via winget.
        echo  Please install manually from: https://cli.github.com
        pause
        exit /b 1
    )
    REM Refresh PATH
    for /f "tokens=*" %%i in ('where /r "C:\Program Files\GitHub CLI" gh.exe 2^>nul') do set GH_PATH=%%i
    if defined GH_PATH (
        set "PATH=%PATH%;C:\Program Files\GitHub CLI"
    )
)
echo  [1/4] GitHub CLI ready.

REM ── Step 2: Login to GitHub ─────────────────
echo.
echo  [2/4] Logging in to GitHub...
echo         A browser window will open - sign in there.
echo.
gh auth login --hostname github.com --git-protocol https --web
if %ERRORLEVEL% NEQ 0 (
    echo  ERROR: GitHub login failed.
    pause
    exit /b 1
)
echo  [2/4] Logged in successfully.

REM ── Step 3: Create repo ──────────────────────
echo.
echo  [3/4] Creating GitHub repository...
gh repo create sports-betting --public --source=. --remote=origin --push
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo  Repo may already exist - trying plain push...
    git push -u origin main
)
echo  [3/4] Code pushed to GitHub.

REM ── Step 4: Enable GitHub Pages ─────────────
echo.
echo  [4/4] Enabling GitHub Pages...
gh api repos/ivanong/sports-betting/pages --method POST --field source[branch]=main --field source[path]=/ >nul 2>&1
echo  [4/4] GitHub Pages enabled.

echo.
echo  ============================================
echo   DONE! Your site will be live in ~60 sec:
echo.
echo   https://ivanong.github.io/sports-betting/
echo  ============================================
echo.

start https://ivanong.github.io/sports-betting/
pause
