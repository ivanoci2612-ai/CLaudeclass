# BetZone — Local HTTP server (PowerShell, no dependencies)
$port = 3000
$root = if ($PSScriptRoot) { $PSScriptRoot } else { 'C:\Users\IvanOngChengIm\Desktop\ClaudeClass\sports-betting' }

$mime = @{
  '.html' = 'text/html'
  '.css'  = 'text/css'
  '.js'   = 'application/javascript'
  '.json' = 'application/json'
  '.svg'  = 'image/svg+xml'
  '.png'  = 'image/png'
  '.ico'  = 'image/x-icon'
}

$listener = [System.Net.HttpListener]::new()
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()

Write-Host ""
Write-Host "  BetZone is running at http://localhost:$port" -ForegroundColor Green
Write-Host "  Open that URL in Chrome or Edge, then look for the install" -ForegroundColor Cyan
Write-Host "  icon ( + ) in the address bar to install as an app." -ForegroundColor Cyan
Write-Host ""
Write-Host "  Press Ctrl+C to stop the server." -ForegroundColor Gray
Write-Host ""

while ($listener.IsListening) {
  $ctx  = $listener.GetContext()
  $req  = $ctx.Request
  $resp = $ctx.Response

  $urlPath = $req.Url.LocalPath -replace '^/', ''
  if ($urlPath -eq '') { $urlPath = 'index.html' }

  $file = Join-Path $root $urlPath

  if (Test-Path $file -PathType Leaf) {
    $ext         = [IO.Path]::GetExtension($file)
    $contentType = if ($mime[$ext]) { $mime[$ext] } else { 'application/octet-stream' }
    $bytes       = [IO.File]::ReadAllBytes($file)
    $resp.ContentType   = $contentType
    $resp.ContentLength64 = $bytes.Length
    $resp.OutputStream.Write($bytes, 0, $bytes.Length)
  } else {
    $resp.StatusCode = 404
  }

  $resp.OutputStream.Close()
}
