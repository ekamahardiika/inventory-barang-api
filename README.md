# Inventory Barang API

A simple RESTful backend API for inventory management (products, categories, users, transactions, reports).

## Quick Overview

- **Stack**: Node.js + TypeScript + Express + Prisma (Postgres compatible)
- **Auth**: JWT-based authentication

## API Table (summary)

| Endpoint | Method | Auth | Description |
|---|---:|---:|---|
| /api/v1/auth/register | POST | No | Register new user (email, password, role) |
| /api/v1/auth/login | POST | No | Login — returns JWT |
| /api/v1/products | GET | Optional/Yes | List products (query: page, limit, search) |
| /api/v1/products | POST | Yes | Create product |
| /api/v1/products/:id | GET | Optional/Yes | Get single product |
| /api/v1/products/:id | PUT | Yes | Update product |
| /api/v1/products/:id | DELETE | Yes (admin) | Delete product |
| /api/v1/categories | GET | Optional/Yes | List categories |
| /api/v1/transactions | POST | Yes | Create transaction (stock out/in) |
| /api/v1/reports | GET | Yes | Generate basic inventory reports |
| /api/v1/users | GET | Yes (admin) | List users |

> Note: Replace `Yes` with required JWT if the endpoint is protected. Roles (e.g., `admin`) may be required for destructive actions.

## Example Request & Response

Example: successful login response

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "name": "Admin",
      "email": "admin@example.com",
      "role": "admin"
    },
    "token": "eyJhbGciOi..."
  }
}
```

Example: listing products

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": 42,
        "name": "Product A",
        "sku": "SKU-123",
        "price": 120000,
        "stock": 15,
        "categoryId": 3
      }
    ],
    "meta": {
      "page": 1,
      "limit": 20,
      "total": 132
    }
  }
}
```

Example: error response

```json
{
  "success": false,
  "message": "Unauthorized",
  "errors": ["Invalid token"]
}
```

## Folder Structure

```
package.json
prisma.config.ts
tsconfig.json
prisma/
  schema.prisma
  migrations/
src/
  app.ts
  server.ts
  controllers/
    authControllers.ts
    categoryControllers.ts
    productControllers.ts
    reportControllers.ts
    transactionController.ts
    userControllers.ts
  middlewares/
    authMiddlewares.ts
    roleMiddlewares.ts
  routes/
    authRoutes.ts
    categoryRoutes.ts
    productRoutes.ts
    reportRoutes.ts
    transactionRoutes.ts
    userRoutes.ts
  services/
    authServices.ts
    categoryServices.ts
    productServices.ts
    reportServices.ts
    transactionService.ts
    userServices.ts
  utils/
    errorHandlers.ts
    hash.ts
    prisma.ts
    token.ts
```

## Environment variables

Create a `.env` file at project root. Common env keys expected:

- `DATABASE_URL` — Postgres connection string for Prisma
- `PORT` — server port (e.g. `3000`)
- `JWT_SECRET` — secret used for signing tokens

## Setup & Run (step-by-step)

1. Install dependencies

```bash
npm install
```

2. Create `.env` from template (or set environment variables)

```bash
copy .env.example .env   # Windows (Powershell)
# cp .env.example .env  # macOS / Linux
```

3. Set `DATABASE_URL` in `.env` to point to your database

4. Run Prisma migrations (development)

```bash
npx prisma migrate dev --name init
npx prisma generate
```

5. Start the dev server

```bash
npm run dev
```

6. Build & start (production)

```bash
npm run build
npm start
```

## Useful Commands

- `npx prisma studio` — open Prisma Studio (DB browser)
- `npx prisma migrate status` — check migrations status

## Notes & Next Steps

- Adjust `.env` values for your environment.
- Add Postman / OpenAPI spec if you want interactive API docs.
- Consider adding tests and CI for migrations + linting.

---

If you'd like, I can also generate a Postman collection or an OpenAPI (Swagger) spec from the routes. Want me to add that?
