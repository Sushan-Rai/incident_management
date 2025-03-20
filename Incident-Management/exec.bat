@echo off

REM Set a title for the terminal window
title Incident Management Build and Deployment

REM Step 1: Delete the JAR file
echo Deleting old JAR file...
if exist target\Incident-Management-0.0.1-SNAPSHOT.jar (
    del target\Incident-Management-0.0.1-SNAPSHOT.jar
    echo JAR file deleted successfully.
) else (
    echo JAR file does not exist. Skipping deletion.
)

REM Step 2: Run Maven build
echo Running Maven build...
mvn clean install -DskipTests
if errorlevel 1 (
    echo Maven build failed. Exiting script.
    exit /b 1
)

REM Step 3: Build Docker image
echo Building Docker image...
docker build -t incima/incident:0.0.1 .
if errorlevel 1 (
    echo Docker image build failed. Exiting script.
    exit /b 1
)

REM Step 4: Run Docker Compose
echo Starting Docker Compose...
docker-compose up -d
if errorlevel 1 (
    echo Docker Compose failed to start. Exiting script.
    exit /b 1
)

echo Deployment completed successfully.
pause

