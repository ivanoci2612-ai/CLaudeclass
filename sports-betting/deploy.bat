@echo off
title BetZone - Deploy to GitHub
cd /d "%~dp0"

echo.
echo ========================================
echo   BetZone - Deploy to GitHub Pages
echo ========================================
echo.

echo Pushing code to GitHub...
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo   SUCCESS! Code pushed to GitHub.
    echo.
    echo   Now enable GitHub Pages:
    echo   1. Go to your repo Settings
    echo   2. Click Pages in the left sidebar
    echo   3. Source: Deploy from a branch
    echo   4. Branch: main / (root) then Save
    echo.
    echo   Your site will be live at:
    echo   https://ivanong.github.io/sports-betting/
    echo ========================================
    start https://github.com/ivanong/sports-betting/settings/pages
) else (
    echo.
    echo ========================================
    echo   ERROR: Push failed.
    echo.
    echo   Make sure you have:
    echo   1. Created the repo at github.com/new
    echo      Name: sports-betting  Visibility: Public
    echo      (no README, no gitignore)
    echo   2. Then double-click this file again
    echo ========================================
    start https://github.com/new
)

echo.
pause
