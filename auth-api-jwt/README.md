# Auth API JWT

Authentication API with registration, login, bcrypt password hashing, JWT issuance, and Bearer token protected routes.

## Setup

```bash
npm install
npm run db:push
```

## Run

```bash
npm run dev
```

Runs on `http://localhost:3000` by default.

## Endpoints

- `POST /register` — body: `{ email, password }`
- `POST /login` — body: `{ email, password }` → returns `{ access_token, token_type }`
- `GET /me` — requires `Authorization: Bearer <token>`

## Notes

Set `JWT_SECRET` in `.env` before deploying to production.
