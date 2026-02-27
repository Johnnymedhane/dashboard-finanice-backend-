# Dashboard Finance Backend

Node.js + Express + MongoDB backend for a simple finance dashboard (transactions, tasks, dashboard summary) with Swagger docs , Joi validation and JWT for usre auth

## Tech

- Node.js (ESM modules)
- Express
- MongoDB + Mongoose
- Joi validation
- Swagger (OpenAPI)
- JWT

## Live server (Render)

- Base URL: https://dashboard-finanice-track.onrender.com
- Swagger UI: https://dashboard-finanice-track.onrender.com/api-docs
- Raw spec: https://dashboard-finanice-track.onrender.com/api-docs.json


## API routes

Base path: `/api/v1`

### Dashboard

- `GET /dashboard?filter=weekly|monthly|yearly|overall`

### Transactions

- `GET /transactions`
  - Query params:
    - `page`, `limit`
    - `type=income|expense`
    - `from`, `to` (date range)

- `POST /transactions`
- `GET /transactions/:id`
- `PUT /transactions/:id`
- `DELETE /transactions/:id` (soft delete)

### Tasks

- `GET /tasks`
  - Query params:
    - `page`, `limit`
    - `status=completed|pending`
    - `from`, `to` (date range)

- `POST /tasks`
- `GET /tasks/:id`
- `PUT /tasks/:id`
- `DELETE /tasks/:id` (soft delete)

## Date filtering behavior (`from` / `to`)

Both **tasks** and **transactions** support two formats:

- Date only: `YYYY-MM-DD`
  - `from` is treated as start-of-day
  - `to` is treated as end-of-day (inclusive)

Example:

```
GET /api/v1/transactions?from=2026-01-24&to=2026-01-26
GET /api/v1/tasks?from=2026-01-27&to=2026-02-28
```

- ISO date-time: `2026-02-27T00:19:32.470Z`
  - used as an exact timestamp boundary

## Soft delete

Transactions and tasks use a `deletedAt` field:
- Normal queries exclude deleted documents.
- Delete endpoints set `deletedAt` instead of removing the document.

## Validation (Joi)

Request body validation is handled by:
- `middleware/validate.js`

Schemas:
- `validations/transactionsValidation.js`
- `validations/tasksvalidation.js`

If validation fails, the API returns `400` with a message from Joi.





- 
