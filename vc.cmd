@echo off
set "PATH=%USERPROFILE%\.gemini\antigravity-ide\scratch\nodejs;%PATH%"
call "%USERPROFILE%\.gemini\antigravity-ide\scratch\tools\node_modules\.bin\vercel.cmd" %*
