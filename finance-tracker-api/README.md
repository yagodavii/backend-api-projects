# Finance Tracker API

Finance API for managing income and expense transactions by category, with monthly balance and period reports.

## Setup

```bash
npm install
npm run db:push
```

## Run

```bash
npm run dev
```

Runs on `http://localhost:3001` by default.

## Endpoints

- `POST /categories` — body: `{ name }`
- `GET /categories`
- `POST /transactions` — body: `{ title, amount, transaction_type, category_id, transaction_date }`
- `GET /transactions?start=YYYY-MM-DD&end=YYYY-MM-DD`
- `GET /reports/monthly?year=2026&month=6`
- `GET /reports/period?start=YYYY-MM-DD&end=YYYY-MM-DD`

## Notes

`transaction_type` must be `"income"` or `"expense"`.
