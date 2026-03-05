# 🚀 Quick Start Guide.

## Persyaratan Sistem
- Node.js (v14 atau lebih tinggi)
- npm atau yarn
- Browser modern (Chrome, Firefox, Safari, Edge)

## 🎯 Instalasi & Menjalankan

### Langkah 1: Clone atau Navigate ke Project
```bash
cd /Users/hisbu/sandbox/itts/frontend/Uts/events-app
```

### Langkah 2: Install Dependencies
```bash
npm install
```

Ini akan menginstal semua package yang diperlukan termasuk React dan React Scripts.

### Langkah 3: Jalankan Development Server
```bash
npm start
```

Aplikasi akan secara otomatis membuka di browser pada `http://localhost:3000`

### Langkah 4: Mulai Menggunakan Aplikasi
1. Isi form event di sidebar kiri
2. Klik "Tambah Event" untuk membuat event baru
3. Event akan muncul di daftar utama
4. Klik tombol "Lihat Peserta" untuk melihat peserta
5. Klik "Tambah Peserta" untuk mendaftarkan peserta baru
6. Gunakan search box dan filter kategori untuk mencari event
7. Lihat statistik di sidebar untuk melihat ringkasan data

## 📋 Fitur-Fitur Dasar

### ➕ Tambah Event
1. Di sidebar, form sudah siap di "➕ Event Baru"
2. Isi semua field yang wajib (bertanda *)
3. Klik tombol "Tambah Event"
4. Akan muncul notifikasi sukses dan event tampil di daftar

### ✏️ Edit Event
1. Klik tombol Edit (✏️) pada event card
2. Form akan berubah ke "✏️ Edit Event"
3. Form akan terisi dengan data event
4. Ubah data yang diinginkan
5. Klik "Perbarui Event"

### 🗑️ Hapus Event
1. Klik tombol Hapus (🗑️) pada event card
2. Akan muncul konfirmasi
3. Klik "OK" untuk mengkonfirmasi penghapusan

### 👥 Tambah Peserta
1. Buka detail event dengan klik "▶ Lihat Peserta"
2. Klik tombol "➕ Tambah Peserta"
3. Form peserta akan muncul
4. Isi nama, email, no telepon peserta
5. Pilih tipe kehadiran (Offline/Online/Hybrid)
6. Opsional: Centang jika mewakili institusi dan isi nama institusi
7. Klik "Tambah Peserta"

### 🔍 Cari Event
1. Gunakan "Cari event atau lokasi..." di bagian atas
2. Ketik nama event atau lokasi
3. Hasil akan ter-filter otomatis

### 📂 Filter Kategori
1. Gunakan dropdown "Filter Kategori"
2. Pilih kategori yang diinginkan
3. Atau pilih "Semua Kategori" untuk melihat semua

### 📊 Lihat Statistik
1. Statistik otomatis ditampilkan di sidebar kanan
2. Menampilkan:
   - Total Event
   - Total Peserta
   - Rata-rata Peserta per Event
   - Utilisasi Kapasitas (dalam %)
   - Total Kapasitas
   - Ketersediaan Tempat

## ⚠️ Validasi Form

### Event Form
- ❌ Nama event tidak boleh kosong
- ❌ Tanggal harus dipilih
- ❌ Waktu harus dipilih
- ❌ Lokasi tidak boleh kosong
- ❌ Deskripsi tidak boleh kosong
- ❌ Max peserta harus lebih dari 0

### Participant Form
- ❌ Nama peserta tidak boleh kosong
- ❌ Email harus valid (format: name@domain.com)
- ❌ No. telepon tidak boleh kosong
- ❌ Jika centang institusi, field institusi wajib diisi

## 💡 Tips & Tricks

### Tips 1: Data Sample
Aplikasi sudah terisi dengan 2 event sample untuk referensi. Anda bisa menghapusnya dan membuat event baru.

### Tips 2: Progress Bar Peserta
Setiap event menampilkan progress bar hijau/merah yang menunjukkan berapa banyak peserta yang sudah terdaftar vs kapasitas maksimal.

### Tips 3: Tombol Tambah Peserta Otomatis Disabled
Ketika peserta sudah penuh (sesuai max participants), tombol "Tambah Peserta" akan disabled dan berubah warna menjadi abu-abu.

### Tips 4: Notifikasi Otomatis Hilang
Notifikasi sukses akan otomatis hilang setelah 3 detik. Anda tidak perlu menutupnya manual.

### Tips 5: Error Hilang Saat Mengetik
Pesan error akan otomatis hilang saat Anda mulai mengetik di field yang error.

## 🏗️ Struktur Project

```
events-app/
├── public/
│   └── index.html          # HTML template
├── src/
│   ├── components/         # Folder komponen React
│   │   ├── EventForm.js    # Form untuk tambah/edit event
│   │   ├── EventForm.css   # Styling form event
│   │   ├── EventList.js    # List event
│   │   ├── EventList.css   # Styling list
│   │   ├── EventCard.js    # Card individual event
│   │   ├── EventCard.css   # Styling card
│   │   ├── ParticipantForm.js      # Form tambah peserta
│   │   ├── ParticipantForm.css     # Styling form peserta
│   │   ├── ParticipantList.js      # List peserta
│   │   ├── ParticipantList.css     # Styling list peserta
│   │   ├── Statistics.js   # Komponen statistik
│   │   └── Statistics.css  # Styling statistik
│   ├── App.js              # Main app component
│   ├── App.css             # Main app styling
│   ├── index.js            # React entry point
│   └── index.css           # Global styles
├── package.json            # Dependencies
├── README.md               # Full documentation
├── SETUP_GUIDE.md          # Panduan lengkap
├── JAVASCRIPT_DOCUMENTATION.md # Dokumentasi JavaScript
└── .gitignore              # Git ignore file
```

## 🔧 Troubleshooting

### Masalah: Aplikasi tidak muncul di browser
**Solusi**: 
```bash
# Pastikan development server berjalan
npm start

# Atau jika sudah berjalan, buka manual di:
http://localhost:3000
```

### Masalah: Error saat npm install
**Solusi**:
```bash
# Hapus node_modules dan lock file
rm -rf node_modules package-lock.json

# Install ulang
npm install
```

### Masalah: Port 3000 sudah terpakai
**Solusi**:
```bash
# Gunakan port lain
PORT=3001 npm start
```

**Selamat menggunakan Event Scheduler! 🎉**
