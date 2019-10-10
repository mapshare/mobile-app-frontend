@ECHO OFF
SETLOCAL ENABLEEXTENSIONS

REM Change the $Spath to your SDK path
REM Change the $EVersion to AVD version 
REM You can check your AVD Version using -List-avds argument with emulator.exe

SET Spath="C:\Users\wzafar\AppData\Local\Android\Sdk\emulator"
SET EVersion="Pixel_3a_API_28"


cd "%Spath%"
emulator -avd "%EVersion%"


ENDLOCAL
pause