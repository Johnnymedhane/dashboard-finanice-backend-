# Dashboard Finance Backend

Express + MongoDB (Mongoose) backend for a finance dashboard. Includes Transactions, Tasks, Dashboard aggregation endpoints, and Swagger UI.

## Live (Render)

- Base URL: https://dashboard-finanice-track.onrender.com
- Swagger UI: https://dashboard-finanice-track.onrender.com/api-docs
- OpenAPI JSON: https://dashboard-finanice-track.onrender.com/api-docs.json



#
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




### Tasks

- `GET /api/tasks`
- `GET /api/tasks/pending`
- `GET /api/tasks/:id`
- `POST /api/tasks`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`



