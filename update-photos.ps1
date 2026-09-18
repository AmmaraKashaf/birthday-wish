<#
    update-photos.ps1
    -----------------
    Scans public\images\ and rewrites the "photos" list inside config.js
    so the slideshow shows every picture you dropped in there.

    HOW TO RUN:  right-click this file -> "Run with PowerShell"
#>

$ErrorActionPreference = 'Stop'

$root      = if ($PSScriptRoot) { $PSScriptRoot } else { (Get-Location).Path }
$imagesDir = Join-Path $root 'public\images'
$configPath = Join-Path $root 'config.js'

Write-Host ''
Write-Host '  Areeba birthday site - photo list updater' -ForegroundColor Magenta
Write-Host '  -----------------------------------------' -ForegroundColor Magenta

if (-not (Test-Path $imagesDir)) {
    Write-Host "  Could not find $imagesDir" -ForegroundColor Red
    Read-Host '  Press Enter to close'
    exit 1
}
if (-not (Test-Path $configPath)) {
    Write-Host "  Could not find $configPath" -ForegroundColor Red
    Read-Host '  Press Enter to close'
    exit 1
}

$extensions = @('.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif')

# Everything except the one special photo, sorted so photo2 comes before photo10
$files = Get-ChildItem -Path $imagesDir -File |
    Where-Object { $extensions -contains $_.Extension.ToLower() } |
    Where-Object { $_.BaseName.ToLower() -ne 'special' } |
    Sort-Object `
        @{ Expression = { $d = ($_.BaseName -replace '\D', ''); if ($d) { [int64]$d } else { [int64]::MaxValue } } },
        @{ Expression = { $_.Name } }

if ($files.Count -eq 0) {
    Write-Host '  No photos found in public\images\ yet.' -ForegroundColor Yellow
    Write-Host '  Copy your pictures in there, then run this again.' -ForegroundColor Yellow
    Read-Host '  Press Enter to close'
    exit 0
}

# Build the replacement block
$lines = foreach ($f in $files) {
    $safe = $f.Name -replace '\\', '/' -replace '"', '\"'
    '    "public/images/' + $safe + '",'
}
$block = "photos: [`r`n" + ($lines -join "`r`n") + "`r`n  ]"

# Swap it into config.js
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
$config = [System.IO.File]::ReadAllText($configPath, $utf8NoBom)

$pattern = 'photos:\s*\[[^\]]*\]'
if ($config -notmatch $pattern) {
    Write-Host '  Could not find the "photos: [ ... ]" list in config.js.' -ForegroundColor Red
    Write-Host '  You can paste this in by hand:' -ForegroundColor Yellow
    Write-Host ''
    Write-Host $block
    Read-Host '  Press Enter to close'
    exit 1
}

$updated = [regex]::Replace($config, $pattern, { param($m) $block }, 1)
[System.IO.File]::WriteAllText($configPath, $updated, $utf8NoBom)

Write-Host ''
Write-Host ("  Added {0} photo(s) to the slideshow:" -f $files.Count) -ForegroundColor Green
foreach ($f in $files) { Write-Host ('    - ' + $f.Name) -ForegroundColor DarkGray }

$special = Get-ChildItem -Path $imagesDir -File |
    Where-Object { $_.BaseName.ToLower() -eq 'special' }

Write-Host ''
if ($special) {
    Write-Host ('  Wish-page photo: ' + $special[0].Name) -ForegroundColor Green
} else {
    Write-Host '  Heads up: no special.jpg found - the wish page will show a' -ForegroundColor Yellow
    Write-Host '  placeholder until you add public\images\special.jpg' -ForegroundColor Yellow
}

Write-Host ''
Write-Host '  Done. Open index.html to take a look.' -ForegroundColor Magenta
Write-Host ''
Read-Host '  Press Enter to close'
