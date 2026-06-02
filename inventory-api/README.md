# Inventory API

Inventory control API with products, categories, stock in/out operations, automatic quantity updates, and movement history.

## Setup

```bash
npm install
npm run db:push
```

## Run

```bash
npm run dev
```

Runs on `http://localhost:3002` by default.

## Endpoints

- `POST /categories` — body: `{ name }`
- `GET /categories`
- `POST /products` — body: `{ name, category_id, quantity? }`
- `GET /products`
- `POST /products/:id/stock-in` — body: `{ quantity }`
- `POST /products/:id/stock-out` — body: `{ quantity }`
- `GET /movements`
