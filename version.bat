@echo off

IF "%1"=="" GOTO :usage

rem Important: no space between %1 and pipe
echo %1|findstr /r "^[0-9]*[0-9]\.[0-9]*[0-9]\.[0-9]*[0-9]$" >nul 2>&1
IF errorlevel 1 (
  GOTO :usage
)

pushd projects\ngx-file-helpers
CALL npm version %1
popd

CALL git commit -a -m "%1" && git tag v%1
CALL git push && git push --tags

GOTO:eof

:usage
echo Usage: %0 ^<version^> ^(x.y.z^)
