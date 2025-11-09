@echo off
@chcp 65001 >nul
echo Booking API Testing
echo.

echo Resetting database for clean test run
call npm run reset-db >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo Database reset completed.
) else (
    echo Warning: Database reset failed, continuing with existing data
)
echo.

echo 1. Successful booking:
curl -X POST http://localhost:3000/api/bookings/reserve -H "Content-Type: application/json" -d "{\"event_id\": 1, \"user_id\": \"user123\"}"
echo.
echo.

echo 2. Duplicate booking attempt (expected error):
curl -X POST http://localhost:3000/api/bookings/reserve -H "Content-Type: application/json" -d "{\"event_id\": 1, \"user_id\": \"user123\"}"
echo.
echo.

echo 3. Booking by another user:
curl -X POST http://localhost:3000/api/bookings/reserve -H "Content-Type: application/json" -d "{\"event_id\": 1, \"user_id\": \"user456\"}"
echo.
echo.

echo 4. Non-existent event (expected error):
curl -X POST http://localhost:3000/api/bookings/reserve -H "Content-Type: application/json" -d "{\"event_id\": 999, \"user_id\": \"user789\"}"
echo.
echo.

echo 5. Invalid data - missing user_id (expected error):
curl -X POST http://localhost:3000/api/bookings/reserve -H "Content-Type: application/json" -d "{\"event_id\": 1}"
echo.
echo.

echo Testing completed
pause
