@echo off
title CRUD Siswa App
echo ========================================
echo    Menjalankan Aplikasi CRUD Siswa
echo ========================================
echo.

echo [1/2] Menjalankan Backend Server...
start "Backend Server" cmd /k "cd backend && npm run dev"

timeout /t 2 /nobreak >nul

echo [2/2] Menjalankan Frontend Server...
start "Frontend Server" cmd /k "cd frontend && npm run dev"

echo.
echo ========================================
echo    ✅ Aplikasi berjalan!
echo    Backend: http://localhost:5000
echo    Frontend: http://localhost:3000
echo ========================================
echo.
echo Tekan tombol apapun untuk menutup...
pause >nul