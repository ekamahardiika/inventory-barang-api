# 🛒 POS Backend API

> REST API sederhana untuk Point of Sale (POS) — dibuat sebagai project pembelajaran backend development.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)

---

## 📌 Tentang Project

**POS Backend API** adalah REST API yang mensimulasikan sistem kasir sederhana. Project ini dibangun untuk memperdalam pemahaman tentang backend development, mulai dari autentikasi, manajemen data, hingga pembuatan laporan penjualan.

### Fitur Utama

| Fitur | Deskripsi |
|---|---|
| 🔐 Authentication | Register & login dengan JWT |
| 👤 User Management | Kelola data pengguna |
| 🏷️ Category Management | Kategori produk (CRUD) |
| 📦 Product Management | Produk dengan stok & harga (CRUD) |
| 🧾 Transactions | Proses transaksi & hitung kembalian |
| 📊 Sales Reports | Laporan harian, bulanan, tahunan & top produk |

---

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Auth**: JWT (JSON Web Token)
- **API Testing**: Postman

---

## 🚀 Installation

### 1. Clone repository

```bash
git clone https://github.com/username/pos-backend-api.git
```

### 2. Masuk ke folder project

```bash
cd pos-backend-api
```

### 3. Install dependencies

```bash
npm install
```

### 4. Setup environment variable

Buat file `.env` di root project:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/pos_db"
JWT_SECRET="your_secret_key"
```

### 5. Run database migration

```bash
npx prisma migrate dev
```

### 6. Jalankan server

```bash
npm run dev
```

Server akan berjalan di **`http://localhost:3000`** ✅

---

## 🔐 Authentication

Beberapa endpoint memerlukan JWT Token. Tambahkan header berikut pada setiap request yang membutuhkan autentikasi:

```
Authorization: Bearer YOUR_TOKEN
```

---

## 📡 API Endpoints

### Auth

#### Register
```
POST /auth/register
```
```json
{
  "name": "Victor",
  "email": "victor@email.com",
  "password": "123456"
}
```

#### Login
```
POST /auth/login
```
```json
{
  "email": "victor@email.com",
  "password": "123456"
}
```
**Response:**
```json
{
  "token": "JWT_TOKEN"
}
```

---

### Users

| Method | Endpoint | Deskripsi |
|---|---|---|
| `GET` | `/users` | Get semua user |
| `GET` | `/users/:id` | Get user by ID |

---

### Categories

| Method | Endpoint | Deskripsi |
|---|---|---|
| `POST` | `/categories` | Buat kategori baru |
| `GET` | `/categories` | Get semua kategori |
| `PATCH` | `/categories/:id` | Update kategori |
| `DELETE` | `/categories/:id` | Hapus kategori |

#### Create / Update Category — Request Body
```json
{
  "name": "Food"
}
```

---

### Products

| Method | Endpoint | Deskripsi |
|---|---|---|
| `POST` | `/products` | Buat produk baru |
| `GET` | `/products` | Get semua produk |
| `GET` | `/products/:id` | Get produk by ID |
| `PATCH` | `/products/:id` | Update produk |
| `DELETE` | `/products/:id` | Hapus produk |

#### Create Product — Request Body
```json
{
  "name": "Indomie",
  "hargaJual": 3500,
  "hargaBeli": 2500,
  "stok": 100,
  "categoryId": "uuid-category"
}
```

#### Update Product — Request Body
```json
{
  "name": "Indomie Goreng",
  "hargaJual": 4000,
  "stok": 80
}
```

---

### Transactions

| Method | Endpoint | Deskripsi |
|---|---|---|
| `POST` | `/transactions` | Buat transaksi baru |
| `GET` | `/transactions` | Get semua transaksi |
| `GET` | `/transactions/:id` | Get detail transaksi |

#### Create Transaction — Request Body
```json
{
  "bayar": 50000,
  "items": [
    { "productId": "uuid-product", "qty": 2 },
    { "productId": "uuid-product-2", "qty": 1 }
  ]
}
```

**Response:**
```json
{
  "total": 35000,
  "bayar": 50000,
  "kembalian": 15000
}
```

---

### Reports

| Method | Endpoint | Deskripsi |
|---|---|---|
| `GET` | `/reports/daily` | Laporan transaksi hari ini |
| `GET` | `/reports/monthly` | Laporan transaksi bulan ini |
| `GET` | `/reports/yearly` | Laporan transaksi tahun ini |
| `GET` | `/reports/top-products` | Produk paling banyak terjual |
| `GET` | `/reports/low-stock` | Produk dengan stok rendah |

#### Daily Report — Response
```json
{
  "totalTransactions": 8,
  "totalRevenue": 240000,
  "totalItems": 17
}
```

#### Top Products — Response
```json
[
  {
    "productName": "Indomie",
    "totalSold": 120
  }
]
```

---

## 🧪 Testing

API dapat diuji menggunakan salah satu tool berikut:

- [Postman](https://www.postman.com/)
- [Thunder Client](https://www.thunderclient.com/) *(VS Code Extension)*
- [Insomnia](https://insomnia.rest/)

---

## 🔮 Future Improvements

Beberapa fitur yang direncanakan untuk dikembangkan ke depannya:

- [ ] Pagination & Search / Filtering
- [ ] Profit Report
- [ ] Dashboard Analytics
- [ ] Unit Testing
- [ ] Docker Support

---

## 📄 License

Project ini dibuat untuk keperluan pembelajaran. Feel free to use & modify. 🙌