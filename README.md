# Backend API Projects

A curated collection of practical backend API projects built with Node.js, Express, Prisma, and SQLite.

This repository was created to demonstrate production-oriented backend engineering skills for international software engineering, backend development, and API integration opportunities.

## Problem Solved

Modern applications depend on reliable backend APIs to handle authentication, business rules, data persistence, financial records, inventory operations, task management, and integrations with external systems.

This repository demonstrates how backend APIs can be structured to solve common business problems with clean REST endpoints, database models, validation, authentication, and event-driven workflows.

## Business Value

These projects demonstrate backend patterns that can be applied to:

* User authentication and protected routes
* Financial transaction tracking
* Inventory and stock control
* Task and workflow management
* Webhook integrations
* Event-driven automation
* Database-backed REST APIs
* Internal business systems

The main goal is to show practical backend development beyond simple examples, using real-world API patterns that can evolve into production-ready services.

## Projects Overview

### 1. Auth API with JWT

Authentication API with registration, login, bcrypt password hashing, JWT token generation, and Bearer token middleware for protected routes.

**Use case:** user authentication for web apps, SaaS platforms, internal systems, and admin dashboards.

**Business value:** provides a secure foundation for user access control and protected backend resources.

### 2. Finance Tracker API

Finance tracking API for managing income and expense transactions by category, with monthly balance and date-range reports.

**Use case:** personal finance apps, business expense tracking, internal financial dashboards, and reporting tools.

**Business value:** helps organize financial data, track cash flow, and generate structured reports.

### 3. Inventory API

Inventory control API with products, categories, stock in/out operations, automatic quantity updates, and full movement history.

**Use case:** stock management, warehouse control, product tracking, and internal ERP-like systems.

**Business value:** reduces manual inventory errors and improves visibility over stock movements.

### 4. Task Manager API

Task management API with per-user task creation, status filtering, priority filtering, update, and delete operations.

**Use case:** productivity tools, internal task systems, workflow management, and team operations.

**Business value:** helps organize work, track execution, and structure operational tasks.

### 5. Webhook Receiver API

Webhook receiver API that validates HMAC-SHA256 payload signatures, stores events in a database, and routes them by event type.

**Use case:** receiving events from external platforms, payment providers, CRMs, automation tools, and third-party APIs.

**Business value:** enables secure system integrations and event-driven automation workflows.

## Repository Structure

```txt
backend-api-projects/
├── auth-api-jwt/
│   ├── index.js
│   ├── package.json
│   ├── .env.example
│   ├── prisma/
│   │   └── schema.prisma
│   └── README.md
├── finance-tracker-api/
│   ├── index.js
│   ├── package.json
│   ├── .env.example
│   ├── prisma/
│   │   └── schema.prisma
│   └── README.md
├── inventory-api/
│   ├── index.js
│   ├── package.json
│   ├── .env.example
│   ├── prisma/
│   │   └── schema.prisma
│   └── README.md
├── task-manager-api/
│   ├── index.js
│   ├── package.json
│   ├── .env.example
│   ├── prisma/
│   │   └── schema.prisma
│   └── README.md
├── webhook-receiver-api/
│   ├── index.js
│   ├── package.json
│   ├── .env.example
│   ├── prisma/
│   │   └── schema.prisma
│   └── README.md
└── README.md
```

## Tech Stack

* Node.js
* Express.js
* Prisma ORM
* SQLite
* REST APIs
* JWT authentication
* bcrypt password hashing
* HMAC-SHA256 signature validation
* CRUD operations
* Event-driven integrations

## Quick Start

Enter one of the project folders:

```bash
cd auth-api-jwt
```

Install dependencies:

```bash
npm install
```

Set up the database:

```bash
npm run db:push
```

Run the API:

```bash
npm run dev
```

Each project folder contains its own README with specific endpoints, environment variables, and usage instructions.

## What This Repository Demonstrates

This repository demonstrates:

* REST API development
* Authentication and authorization
* Database modeling with Prisma
* CRUD operations
* Business rule implementation
* Webhook validation
* Event storage
* Financial data workflows
* Inventory movement logic
* Backend project organization

## Portfolio Goal

The goal of this repository is to show hands-on backend engineering skills through clean, runnable REST APIs covering authentication, CRUD, event-driven integrations, financial workflows, inventory logic, and internal business system patterns.

These projects are designed to demonstrate how backend APIs can support real product features, automate workflows, protect data, and connect different systems.
