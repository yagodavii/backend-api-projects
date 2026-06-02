# Webhook Receiver API

Webhook receiver that validates HMAC-SHA256 payload signatures, stores events in a database, and routes them by event type.

## Setup

```bash
npm install
npm run db:push
```

## Run

```bash
npm run dev
```

Runs on `http://localhost:3004` by default.

## Endpoints

- `POST /webhooks/:source` — body: `{ event_type, data }` — requires `X-Signature` header
- `GET /events`

## Signature

Compute `HMAC-SHA256` of the JSON request body using the shared secret, then send the hex digest in the `X-Signature` header.

Set `WEBHOOK_SECRET` in `.env` to match your webhook sender.

## Event Types

Automatically processed: `user.created`, `payment.completed`, `order.updated`. All others are set to `queued`.
