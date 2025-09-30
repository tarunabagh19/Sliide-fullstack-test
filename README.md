# This is a full-stack demo application built with:

Frontend: React + Vite + TypeScript
Backend: Node.js + Express + TypeScript
Database: PostgreSQL
Containerization: Docker & Docker Compose
The app lets you manage hierarchical categories (parent/child relationships) with a REST API and frontend tree view.

# Features

View categories in a hierarchical tree.
Update category name or parent via dropdown.
Backend API built with Express + PostgreSQL.
Database bootstrapped with init.sql.
Fully containerized with Docker Compose.

# Softwares to be installed:

Docker
Docker Compose

# Installation & Setup

``` git clone https://github.com/tarunabagh19/Sliide-fullstack-test.git
cd Sliide-fullstack-test/test-categories
```

# 1. Build & Start the App

```
   docker-compose up --build
```
# 2. Verify Running Services

Frontend: http://localhost:3000

Backend API: http://localhost:5000/api/categories

Database: Accessible inside Docker at host db, port 5432, user postgres.

# Rebuild the containers

docker-compose build

# Stop all containers:

docker-compose down

# Reset the database:

docker-compose down -v
docker-compose up --build

