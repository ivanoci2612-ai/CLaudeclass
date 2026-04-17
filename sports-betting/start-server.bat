@echo off
echo Starting BetZone server...
powershell.exe -ExecutionPolicy Bypass -File "%~dp0serve.ps1"
pause
