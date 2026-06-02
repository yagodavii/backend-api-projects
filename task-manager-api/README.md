# Task Manager API

Task management API with per-user task creation, status and priority filtering, update, and delete.

## Setup

```bash
npm install
npm run db:push
```

## Run

```bash
npm run dev
```

Runs on `http://localhost:3003` by default.

## Flow

1. Create a user via `POST /users`.
2. Pass `X-User-Id: <id>` header in all task endpoints.

## Endpoints

- `POST /users` — body: `{ name }`
- `POST /tasks` — body: `{ title, description?, status?, priority? }`
- `GET /tasks?status=&priority=`
- `PATCH /tasks/:id` — body: `{ title?, description?, status?, priority? }`
- `DELETE /tasks/:id`

## Notes

`status` options: `todo`, `in_progress`, `done`. `priority` options: `low`, `medium`, `high`.
