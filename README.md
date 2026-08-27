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

## Getting started

```bash
npm install
cp .env.example .env   # fill in your DB credentials and a JWT secret
npm start
```

The server runs on `http://localhost:5001` by default.

You'll need a local MySQL instance with a `marketplace` database and `products` / `users` tables matching the schema used in `models/`.

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
