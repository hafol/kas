$nodeDir = "$env:USERPROFILE\.gemini\antigravity-ide\scratch\nodejs"
$vercelCmd = "$env:USERPROFILE\.gemini\antigravity-ide\scratch\tools\node_modules\.bin\vercel.cmd"
$env:Path = "$nodeDir;" + $env:Path
& $vercelCmd @args
