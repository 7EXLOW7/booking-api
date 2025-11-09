@echo off
chcp 65001 >nul
echo Database Reset
echo.

if not exist .env (
    echo ERROR: .env file not found!
    echo Please create .env file with database configuration.
    pause
    exit /b 1
)

echo Clearing database and adding fresh test data
call npm run reset-db

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Reset failed
    echo Please check your database connection settings in .env file
    echo Make sure PostgreSQL is running
)

pause
