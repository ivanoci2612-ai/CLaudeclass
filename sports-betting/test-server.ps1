try {
  $r = Invoke-WebRequest -Uri 'http://localhost:3000' -UseBasicParsing -TimeoutSec 4
  "Status: $($r.StatusCode) | Bytes: $($r.Content.Length)" | Out-File 'C:\Users\IvanOngChengIm\Desktop\ClaudeClass\sports-betting\test-out.txt'
} catch {
  "Error: $_" | Out-File 'C:\Users\IvanOngChengIm\Desktop\ClaudeClass\sports-betting\test-out.txt'
}
