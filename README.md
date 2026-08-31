# marketplaceb

REST API backend for [nightmarkt](https://github.com/SalamahAlmiro/nightmarkt), a marketplace web application. Built with Node.js, Express, and MySQL.

## Features

- JWT authentication (register/login) with bcrypt password hashing
- Product CRUD with server-side validation (Joi schemas) on all write endpoints
- Real-time updates via Socket.IO — connected clients are notified instantly when a product is created, edited, or deleted
- Custom product attributes support
- Route-level auth middleware protecting all write operations

## Tech stack

Node.js, Express, MySQL (`mysql2`), Socket.IO, JSON Web Tokens, bcrypt, Joi

## Running with Docker

1. Create a `.env` file in the project root with the following set:
   DB_HOST=db
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=marketplace
   JWT_SECRET=your_secret_key
2. Run `docker compose up --build`
3. The API will be available at `http://localhost:5001`

Both services have healthchecks — the `db` service checks MySQL is accepting
connections, and the `api` service's `/health` endpoint verifies it can
actually reach the database (not just that the process is alive). The API
container won't start until the DB reports healthy
(`depends_on: condition: service_healthy`), which avoids a race condition
where the app tries to connect before MySQL is ready.

Check status with:
    docker compose ps

Both should show `(healthy)` once fully up.

## API overview

| Method | Route | Auth required | Description |
|---|---|---|---|
| POST | `/api/auth/register` | No | Register a new user |
| POST | `/api/auth/login` | No | Log in and receive a JWT |
| GET | `/api/products` | No | List all products |
| POST | `/api/products` | Yes | Create a product |
| PUT | `/api/products` | Yes | Edit a product |
| DELETE | `/api/products` | Yes | Delete a product |
| POST | `/api/products/:productId/attribute` | Yes | Add custom attributes to a product |
| PUT | `/api/users/editUser` | — | Edit user details |
| DELETE | `/api/users/deleteUser` | — | Delete a user |

Authenticated routes expect an `Authorization: Bearer <token>` header.

## Real-time events

The server emits the following Socket.IO events to all connected clients:

- `product_created`
- `product_updated`
- `product_deleted`

## Project structure

```
api/          Route aggregation
controllers/  Request handlers
middlewares/  Auth and request validation
models/       Database queries (mysql2)
routes/       Express route definitions
utils/        Helper functions (JWT signing)
```

## Running tests

This project uses Jest and Supertest for API testing, with a separate test database to avoid touching dev data.

1. Create a `marketplace_test` database and run `migrations/schema.sql` against it
2. Copy `.env` to `.env.test` and change `DB_NAME` to `marketplace_test`
3. Run `npm test`

This also passes when run inside the `api` container (`docker compose exec api npm test`), confirming the containerized environment matches what the tests expect.

## Getting started without docker


1-Create a `.env` file in the project root with the following set:
  DB_HOST=localhost
  DB_USER=root
  DB_PASSWORD=your_password
  DB_NAME=marketplace
  JWT_SECRET=your_secret_key
2-npm install
3-npm start


The server runs on `http://localhost:5001` by default.

Run the migrations/schema.sql file to migrate all needed tables. 

```bash
mysql -u root -p marketplace < migrations/schema.sql
```
