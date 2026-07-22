# 🚿 WashUp - Sistem Manajemen Laundry Berbasis Web

## 📖 Deskripsi

**WashUp** merupakan aplikasi berbasis web yang dikembangkan sebagai proyek **Ujian Akhir Semester (UAS)**. Aplikasi ini bertujuan untuk membantu proses pengelolaan usaha laundry agar lebih efektif dan efisien, mulai dari pencatatan pelanggan, pengelolaan pesanan, hingga proses pembayaran.

Sistem dibangun menggunakan arsitektur **Frontend** dan **Backend** yang saling terhubung melalui REST API sehingga mudah dikembangkan dan dipelihara.

---

# 👥 Anggota Kelompok

| Nama                   | NIM        |
| ---------------------- | ---------- |
| Arsya Pramudya Kuntadi | 24.11.6078 |
| Muhamad Rifal          | 24.11.6082 |
| Favian Pahlevi         | 24.11.6100 |

---

# 🎯 Tujuan Proyek

- Membuat sistem informasi laundry berbasis web.
- Mempermudah pengelolaan data pelanggan, pesanan, dan pembayaran.
- Mengimplementasikan REST API untuk komunikasi antara Frontend dan Backend.
- Mengimplementasikan **JSON Web Token (JWT)** sebagai mekanisme autentikasi dan otorisasi pengguna.
- Mengimplementasikan konsep Full Stack Web Development menggunakan React.js, NestJS, dan MySQL.

---

# ✨ Fitur Utama

### 👤 Autentikasi

* Login
* Register
* JWT Authentication
* Role Admin dan Pelanggan

### 📦 Manajemen Pesanan

* Tambah pesanan
* Melihat daftar pesanan
* Update status pesanan
* Riwayat pesanan pelanggan

### 💳 Pembayaran

* Pencatatan pembayaran
* Status lunas/belum lunas
* Riwayat pembayaran

### 👥 Manajemen Pengguna

* Data pelanggan
* Hak akses berdasarkan role

---

# 🛠️ Teknologi yang Digunakan

## Frontend

* React.js
* Vite
* Bootstrap
* Axios

## Backend

* NestJS
* TypeScript
* JWT Authentication
* Passport
* REST API

## Database

* MySQL
* phpMyAdmin

---

# 📁 Struktur Project

```
UAS
│
├── washup
│   ├── src
│   ├── public
│   ├── package.json
│   └── ...
│
├── washup-backend
│   ├── src
│   ├── prisma / database
│   ├── package.json
│   └── ...
│
└── README.md
```

---

# 🚀 Cara Menjalankan Project

## 1. Clone Repository

```bash
git clone https://github.com/arsya-pramudya/UAS_FinalProject_PemrogramanWeb.git
```

---

## 2. Jalankan Backend

Masuk ke folder backend

```bash
cd washup-backend
```

Install dependency

```bash
npm install
```

Jalankan server

```bash
npm run start:dev
```

---

## 3. Jalankan Frontend

Masuk ke folder frontend

```bash
cd washup
```

Install dependency

```bash
npm install
```

Jalankan aplikasi

```bash
npm run dev
```

---

# 🗄️ Database

Project menggunakan **MySQL** sebagai database utama.

Sebelum menjalankan aplikasi:

* Buat database pada MySQL/phpMyAdmin.
* Import file SQL yang telah disediakan.
* Sesuaikan konfigurasi koneksi database pada file `.env`.

Contoh konfigurasi:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=
DB_DATABASE=washup_db

JWT_SECRET=your_secret_key
```

---


# 📚 Mata Kuliah

**Pemrograman Web**

Program Studi S1 Informatika

Universitas Amikom Yogyakarta

---

# 📌 Catatan

Repository ini dibuat sebagai pemenuhan tugas **Ujian Akhir Semester (UAS)** mata kuliah Pemrograman Web.

Project ini masih dapat dikembangkan dengan berbagai fitur tambahan seperti:

* Notifikasi status pesanan
* Upload bukti pembayaran
* Dashboard laporan
* Grafik pendapatan
* Cetak invoice
* Integrasi pembayaran digital

---

# 📄 Lisensi

Repository ini dibuat untuk keperluan akademik dan pembelajaran.
