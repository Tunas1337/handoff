# MongoDB Setup Script for Dashboard App
# This script helps you set up MongoDB for the dashboard application

# (Written by ChatGPT as a contingency - ideally the admin would have a mongoDB instance set up on the webserver)

Write-Host "🚀 MongoDB Setup for Dashboard App" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green

Write-Host "`n📋 Prerequisites:" -ForegroundColor Yellow
Write-Host "1. MongoDB Community Server (if not using Docker)"
Write-Host "2. Docker (alternative option)"
Write-Host "3. Node.js and npm (already installed)"

Write-Host "`n🔧 Setup Options:" -ForegroundColor Yellow
Write-Host "1. Install MongoDB Community Server"
Write-Host "2. Use Docker (recommended)"
Write-Host "3. Skip MongoDB setup (use fallback shortcuts only)"

$choice = Read-Host "`nSelect an option (1-3)"

switch ($choice) {
    "1" {
        Write-Host "`n📥 Installing MongoDB Community Server..." -ForegroundColor Blue
        
        # Check if Chocolatey is installed
        if (!(Get-Command choco -ErrorAction SilentlyContinue)) {
            Write-Host "❌ Chocolatey is not installed. Please install it first:" -ForegroundColor Red
            Write-Host "   Run this command as Administrator:" -ForegroundColor Yellow
            Write-Host "   Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))" -ForegroundColor Cyan
            Write-Host "`n   Then run this script again." -ForegroundColor Yellow
            exit 1
        }
        
        # Install MongoDB
        Write-Host "Installing MongoDB via Chocolatey..." -ForegroundColor Blue
        choco install mongodb -y
        
        Write-Host "`n✅ MongoDB installed successfully!" -ForegroundColor Green
        Write-Host "Starting MongoDB service..." -ForegroundColor Blue
        
        # Start MongoDB service
        Start-Service MongoDB
        
        Write-Host "✅ MongoDB service started!" -ForegroundColor Green
    }
    
    "2" {
        Write-Host "`n🐳 Using Docker for MongoDB..." -ForegroundColor Blue
        
        # Check if Docker is installed
        if (!(Get-Command docker -ErrorAction SilentlyContinue)) {
            Write-Host "❌ Docker is not installed. Please install Docker Desktop first:" -ForegroundColor Red
            Write-Host "   Download from: https://www.docker.com/products/docker-desktop/" -ForegroundColor Yellow
            Write-Host "   Then run this script again." -ForegroundColor Yellow
            exit 1
        }
        
        Write-Host "Starting MongoDB container..." -ForegroundColor Blue
        docker run -d --name dashboard-mongodb -p 27017:27017 mongo:latest
        
        Write-Host "✅ MongoDB container started!" -ForegroundColor Green
        Write-Host "Container name: dashboard-mongodb" -ForegroundColor Cyan
        Write-Host "Port: 27017" -ForegroundColor Cyan
        
        Write-Host "`n📝 Useful Docker commands:" -ForegroundColor Yellow
        Write-Host "   Stop container: docker stop dashboard-mongodb" -ForegroundColor Cyan
        Write-Host "   Start container: docker start dashboard-mongodb" -ForegroundColor Cyan
        Write-Host "   Remove container: docker rm dashboard-mongodb" -ForegroundColor Cyan
    }
    
    "3" {
        Write-Host "`n⏭️  Skipping MongoDB setup." -ForegroundColor Yellow
        Write-Host "The app will use fallback shortcuts only." -ForegroundColor Yellow
        exit 0
    }
    
    default {
        Write-Host "❌ Invalid option. Please run the script again and select 1, 2, or 3." -ForegroundColor Red
        exit 1
    }
}

Write-Host "`n🌱 Seeding database with default shortcuts..." -ForegroundColor Blue
npm run seed

Write-Host "`n✅ Setup complete!" -ForegroundColor Green
Write-Host "You can now start the development server with: npm run dev" -ForegroundColor Cyan
