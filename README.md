# Dashboard Finance Backend

Express + MongoDB (Mongoose) backend for a finance dashboard. Includes Transactions, Tasks, and Dashboard aggregation endpoints, plus Swagger UI.



1

## API Docs (Swagger)

- Swagger UI: `http://localhost:5000/api-docs`
- OpenAPI JSON: `http://localhost:5000/api-docs.json`

## Endpoints

### Dashboard

- `GET /api/dashboard?filter=weekly|monthly|yearly`

### Transactions

- `GET /api/transactions`
- `GET /api/transactions/recent`
- `GET /api/transactions/:id`
- `POST /api/transactions`
- `PUT /api/transactions/:id`
- `DELETE /api/transactions/:id`

**Validation (high level)**
- `type`: `income` or `expense`
- `amount`: number > 0
- `status` (optional): `completed` or `pending`
- `date` (optional): valid date

### Tasks

- `GET /api/tasks`
- `GET /api/tasks/pending`
- `GET /api/tasks/:id`
- `POST /api/tasks`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`

**Validation (high level)**
- `title`: required for create; non-empty string (whitespace-only rejected)
- `progress` (optional): number 0..100
- `completed` (optional): boolean

## 404 Behavior

- `GET /` returns the landing page from `public/index.html`.
- Unknown routes return `public/pageNotFound.html` with a 404.

## Seeding (optional)

There is a seed script for tasks:

- `node scripts/seedTasks.js`

This connects using `MONGO_URI`, clears tasks, and inserts example tasks.
