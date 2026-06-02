# Backend API Projects

A curated collection of practical backend API projects built with Node.js.

This repository was designed to showcase production-oriented backend engineering skills for international software engineering opportunities.

## Repository Structure

```text
backend-api-projects/
+-- auth-api-jwt/
|   +-- index.js
|   +-- package.json
|   +-- .env.example
|   +-- prisma/
|       +-- schema.prisma
|   +-- README.md
+-- finance-tracker-api/
|   +-- index.js
|   +-- package.json
|   +-- .env.example
|   +-- prisma/
|       +-- schema.prisma
|   +-- README.md
+-- inventory-api/
|   +-- index.js
|   +-- package.json
|   +-- .env.example
|   +-- prisma/
|       +-- schema.prisma
|   +-- README.md
+-- task-manager-api/
|   +-- index.js
|   +-- package.json
|   +-- .env.example
|   +-- prisma/
|       +-- schema.prisma
|   +-- README.md
+-- webhook-receiver-api/
|   +-- index.js
|   +-- package.json
|   +-- .env.example
|   +-- prisma/
|       +-- schema.prisma
|   +-- README.md
+-- README.md
```

## Projects Overview

### 1) auth-api-jwt
Authentication API with registration, login, bcrypt password hashing, JWT issuance, and Bearer token middleware for protected routes.

### 2) finance-tracker-api
Finance tracking API for managing income and expense transactions by category, with monthly balance and date-range period reports.

### 3) inventory-api
Inventory control API with products, categories, stock in/out operations, automatic quantity updates, and full movement history.

### 4) task-manager-api
Task management API with per-user task creation, status and priority filtering, update, and delete via header-based user identification.

### 5) webhook-receiver-api
Webhook receiver API that validates HMAC-SHA256 payload signatures, stores events in a database, and routes them by event type.

## Quick Start

1. Enter a project folder.
2. Install dependencies and set up the database.
3. Copy `.env.example` to `.env` and adjust the values.
4. Run the server using the commands from that folder's `README.md`.

Example:

```bash
cd auth-api-jwt
npm install
npm run db:push
npm run dev
```

## Tech Stack

- Node.js
- Express.js
- Prisma ORM
- SQLite
- JWT authentication
- HMAC-SHA256 signature validation

## Portfolio Goal

Demonstrate hands-on backend engineering skills with clean, runnable REST APIs covering authentication, CRUD, event-driven integrations, and financial data workflows.
