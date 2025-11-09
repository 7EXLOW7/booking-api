@echo off
chcp 65001 >nul
echo Database Setup
echo.

if not exist .env (
    echo ERROR: .env file not found!
    echo Please create .env file with database configuration.
    pause
    exit /b 1
)

echo Running database setup script
call npm run setup-db

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Setup failed
    echo Please check your database connection settings in .env file
    echo Make sure PostgreSQL is running
)

pause
