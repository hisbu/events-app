# Event Scheduler Application using react.

Aplikasi Event Scheduler yang dibangun menggunakan **React** untuk mengelola dan menjadwalkan acara dengan mudah.

## 📋 Fitur Utama

### 1. **Manajemen Event (CRUD Operations)**
- ✅ **Tambah Event**: Membuat event baru dengan berbagai detail
- ✅ **Ubah Event**: Edit informasi event yang sudah dibuat
- ✅ **Hapus Event**: Menghapus event dari aplikasi
- ✅ **Lihat Detail Event**: Menampilkan informasi lengkap event

### 2. **Manajemen Peserta**
- ✅ **Tambah Peserta**: Mendaftarkan peserta ke event
- ✅ **Lihat Daftar Peserta**: Melihat semua peserta yang terdaftar
- ✅ **Hapus Peserta**: Menghapus peserta dari event
- ✅ **Tracking Kapasitas**: Memantau jumlah peserta vs kapasitas maksimal

### 3. **Pencarian & Filter**
- ✅ **Pencarian Event**: Cari event berdasarkan nama atau lokasi
- ✅ **Filter Kategori**: Saring event berdasarkan kategori
- ✅ **Hasil Real-time**: Update hasil pencarian secara langsung

### 4. **Statistik & Laporan**
- ✅ **Total Event**: Menampilkan jumlah event yang ada
- ✅ **Total Peserta**: Menghitung total peserta di semua event
- ✅ **Rata-rata Peserta**: Menghitung rata-rata peserta per event
- ✅ **Utilisasi Kapasitas**: Menampilkan persentase penggunaan kapasitas
- ✅ **Ketersediaan Tempat**: Menunjukkan sisa tempat yang tersedia

## 📊 Struktur Data

### Data Event
```javascript
{
  id: number,
  name: string,                // Nama event
  date: string,               // Tanggal event (YYYY-MM-DD)
  time: string,               // Waktu event (HH:MM)
  category: string,           // Kategori: Workshop, Seminar, Training, Konferensi, Meetup
  location: string,           // Lokasi event
  description: string,        // Deskripsi detail event
  maxParticipants: number,    // Kapasitas maksimal peserta
  participants: Array         // Array peserta yang terdaftar
}
```

### Data Peserta
```javascript
{
  id: string,
  name: string,              // Nama peserta
  email: string,             // Email peserta
  phone: string,             // Nomor telepon
  affiliation?: string,      // Asosiasi/Institusi (opsional)
  attendanceType: string     // Tipe kehadiran: offline, online, hybrid
}
```

## 🎯 Input Form yang Digunakan

### Event Form
- **Text Input**: Nama Event, Lokasi, Deskripsi
- **Date Input**: Tanggal Event
- **Time Input**: Waktu Event
- **Number Input**: Maximum Participants
- **Select Dropdown**: Kategori Event
- **Textarea**: Deskripsi Detail

### Participant Form
- **Text Input**: Nama Peserta, Institusi/Asosiasi
- **Email Input**: Email Peserta
- **Tel Input**: Nomor Telepon
- **Checkbox**: Perwakilan Institusi
- **Radio Buttons**: Tipe Kehadiran (Offline, Online, Hybrid)

## ✨ Validasi & Feedback

### Event Form Validation
- ✅ Nama event tidak boleh kosong
- ✅ Tanggal harus dipilih
- ✅ Waktu harus dipilih
- ✅ Lokasi tidak boleh kosong
- ✅ Deskripsi tidak boleh kosong
- ✅ Max peserta harus lebih dari 0

### Participant Form Validation
- ✅ Nama peserta tidak boleh kosong
- ✅ Email harus valid (format email yang benar)
- ✅ Nomor telepon tidak boleh kosong
- ✅ Jika checkbox institusi dicentang, field institusi wajib diisi

### Feedback Pengguna
- ✅ **Success Notification**: Pesan hijau ketika operasi berhasil
- ✅ **Error Messages**: Pesan error untuk validasi yang gagal
- ✅ **Confirmation Dialog**: Konfirmasi sebelum hapus data
- ✅ **Real-time Validation**: Error hilang saat user mulai edit

## 🛠 Stack Teknologi

- **Frontend Framework**: React 18.2.0
- **Styling**: CSS3 (External CSS)
- **State Management**: React Hooks (useState)
- **Package Manager**: npm

## 📦 Struktur Folder

```
events-app/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── EventForm.js
│   │   ├── EventForm.css
│   │   ├── EventList.js
│   │   ├── EventList.css
│   │   ├── EventCard.js
│   │   ├── EventCard.css
│   │   ├── ParticipantForm.js
│   │   ├── ParticipantForm.css
│   │   ├── ParticipantList.js
│   │   ├── ParticipantList.css
│   │   ├── Statistics.js
│   │   └── Statistics.css
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   ├── index.css
│   └── ...
├── package.json
└── ...
```

## 🚀 Cara Menggunakan

### 1. Instalasi Dependencies
```bash
npm install
```

### 2. Menjalankan Aplikasi
```bash
npm start
```

Aplikasi akan terbuka di `http://localhost:3000`

### 3. Build untuk Production
```bash
npm run build
```

## 💡 Cara Kerja Aplikasi

### Tambah Event
1. Isi form di sidebar dengan detail event
2. Sistem akan memvalidasi input
3. Klik tombol "Tambah Event"
4. Event akan muncul di daftar utama

### Edit Event
1. Klik tombol Edit (✏️) pada event card
2. Form akan terisi dengan data event
3. Ubah data yang diperlukan
4. Klik "Perbarui Event"

### Hapus Event
1. Klik tombol Hapus (🗑️) pada event card
2. Konfirmasi penghapusan
3. Event akan dihapus dari daftar

### Tambah Peserta
1. Buka detail event dengan mengklik "Lihat Peserta"
2. Klik "Tambah Peserta"
3. Isi form peserta
4. Klik "Tambah Peserta"

### Cari & Filter Event
1. Gunakan search box untuk mencari berdasarkan nama atau lokasi
2. Gunakan dropdown kategori untuk filter berdasarkan jenis event
3. Hasil akan update secara real-time

### Melihat Statistik
1. Statistik menampilkan di sidebar
2. Secara otomatis terupdate saat ada perubahan data
3. Menampilkan 4 metrik utama + detail kapasitas

## 🎨 Tema & Styling

- **Color Scheme**: Purple Gradient (#667eea - #764ba2)
- **Responsive Design**: Mobile-first approach
- **Interactive Elements**: Hover effects, smooth transitions
- **Accessibility**: Proper form labels, semantic HTML

## 📱 Responsive Design

- **Desktop**: Layout grid 2 kolom (sidebar + main)
- **Tablet**: Fleksibel grid layout
- **Mobile**: Single column layout

## 🔒 Keamanan

- Input validation di client-side
- Confirmation dialog untuk operasi berbahaya
- Sanitasi input untuk prevent XSS

## 📄 Lisensi

Proyek ini dibuat untuk tujuan pembelajaran.

---
