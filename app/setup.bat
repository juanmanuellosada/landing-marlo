@echo off
echo ========================================
echo Setup del Editor de Contenidos
echo ========================================
echo.

:: Verificar si existe users.json
if exist users.json (
    echo [OK] users.json ya existe
) else (
    echo [CREANDO] Copiando users.json desde users.json.example...
    copy users.json.example users.json
    echo.
    echo [IMPORTANTE] Edita users.json y cambia las credenciales por defecto
    echo.
)

:: Verificar si node_modules existe
if exist node_modules (
    echo [OK] node_modules ya existe
) else (
    echo [INSTALANDO] Instalando dependencias...
    call npm install
)

echo.
echo ========================================
echo Setup completado!
echo ========================================
echo.
echo Para iniciar el proyecto:
echo   1. Frontend + Backend juntos:  npm run dev:full
echo   2. Solo Frontend:              npm run dev
echo   3. Solo Backend:               npm run server
echo.
echo Accede al editor en: http://localhost:5173/editor
echo.
pause
