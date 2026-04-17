$out = 'C:\Users\IvanOngChengIm\Desktop\ClaudeClass\sports-betting\setup-out.txt'
'' | Out-File $out

# Check winget
try {
  $wv = & winget --version 2>&1
  "winget: $wv" | Out-File $out -Append
} catch {
  "winget: not found" | Out-File $out -Append
}

# Check gh
try {
  $ghv = & gh --version 2>&1
  "gh: $ghv" | Out-File $out -Append
} catch {
  "gh: not found" | Out-File $out -Append
}
