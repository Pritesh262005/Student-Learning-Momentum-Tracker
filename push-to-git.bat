@echo off
echo ========================================
echo   Git Push - Student Learning Tracker
echo ========================================
echo.

REM Check if git is initialized
if not exist .git (
    echo Initializing Git repository...
    git init
    echo.
)

REM Add remote if not exists
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo Adding remote repository...
    git remote add origin https://github.com/Pritesh262005/STUDENT-LEARNING-TRACKER.git
    echo.
)

REM Show current status
echo Current Git Status:
echo -------------------
git status
echo.

REM Confirm before proceeding
set /p confirm="Do you want to add, commit, and push all changes? (Y/N): "
if /i not "%confirm%"=="Y" (
    echo Push cancelled.
    pause
    exit /b
)

echo.
echo Adding all files...
git add .

echo.
set /p message="Enter commit message (or press Enter for default): "
if "%message%"=="" (
    set message=Update: Student Learning Momentum Tracker
)

echo.
echo Committing changes...
git commit -m "%message%"

echo.
echo Checking branch...
git branch -M main

echo.
echo Pushing to GitHub...
git push -u origin main

if errorlevel 1 (
    echo.
    echo ========================================
    echo   Push Failed!
    echo ========================================
    echo.
    echo Possible reasons:
    echo 1. Authentication required - use Personal Access Token
    echo 2. Remote repository doesn't exist
    echo 3. Network connection issue
    echo.
    echo See GIT_PUSH_GUIDE.md for help
    echo.
) else (
    echo.
    echo ========================================
    echo   Successfully Pushed to GitHub!
    echo ========================================
    echo.
    echo Repository: https://github.com/Pritesh262005/STUDENT-LEARNING-TRACKER
    echo.
)

pause
