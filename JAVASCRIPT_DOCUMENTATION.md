# Dokumentasi JavaScript - Event Scheduler

## 📚 Penjelasan Fitur JavaScript

Aplikasi Event Scheduler menggunakan konsep-konsep JavaScript modern melalui React. Berikut adalah penjelasan detail tentang implementasi JavaScript yang digunakan:

## 🔤 Variabel & Tipe Data Dasar

### State Variables (useState Hook)
```javascript
const [events, setEvents] = useState([
  // Array of event objects
  {
    id: 1,
    name: 'Workshop React',
    date: '2025-12-15',
    time: '09:00',
    category: 'Workshop',
    location: 'Ruang A',
    description: 'Belajar React dari dasar hingga mahir',
    maxParticipants: 30,
    participants: [
      { id: 1, name: 'Budi', email: 'budi@example.com' }
    ]
  }
]);
```

### Tipe Data yang Digunakan
- **String**: Nama event, lokasi, deskripsi, email
- **Number**: ID event, jumlah peserta, maksimal peserta, waktu
- **Boolean**: Flag untuk checkbox, mode edit
- **Object**: Data event, data peserta
- **Array**: Daftar event, daftar peserta

## 📦 Struktur Data Array & Object

### Array of Objects (Events)
```javascript
const events = [
  {
    id: 1,
    name: 'Workshop React',
    date: '2025-12-15',
    time: '09:00',
    category: 'Workshop',
    location: 'Ruang A',
    description: 'Belajar React dari dasar hingga mahir',
    maxParticipants: 30,
    participants: [
      { id: 1, name: 'Budi', email: 'budi@example.com' }
    ]
  },
  // ... more events
];
```

### Array Methods yang Digunakan
- **map()**: Transformasi data (contoh: render event list)
- **filter()**: Menyaring data (contoh: search & filter)
- **reduce()**: Agregrasi data (contoh: hitung statistik)
- **find()**: Mencari satu item (contoh: cari event berdasarkan ID)

## 🔧 Fungsi-Fungsi Buatan Sendiri

### 1. Fungsi Validasi Form
```javascript
const validateForm = () => {
  const newErrors = {};

  if (!formData.name.trim()) {
    newErrors.name = 'Nama event wajib diisi';
  }
  if (!formData.date) {
    newErrors.date = 'Tanggal wajib diisi';
  }
  if (formData.maxParticipants <= 0) {
    newErrors.maxParticipants = 'Jumlah peserta harus lebih dari 0';
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
```

**Kegunaan**: Memvalidasi input form sebelum data disimpan

### 2. Fungsi Tambah Event
```javascript
const handleAddEvent = (newEvent) => {
  const event = {
    ...newEvent,
    id: Math.max(...events.map(e => e.id), 0) + 1,
    participants: []
  };
  setEvents([...events, event]);
  showNotification('success', `Event "${newEvent.name}" berhasil ditambahkan!`);
};
```

**Kegunaan**: Menambahkan event baru ke daftar

### 3. Fungsi Update Event
```javascript
const handleUpdateEvent = (updatedEvent) => {
  setEvents(events.map(e => e.id === updatedEvent.id ? updatedEvent : e));
  setEditingEventId(null);
  showNotification('success', `Event "${updatedEvent.name}" berhasil diperbarui!`);
};
```

**Kegunaan**: Mengubah data event yang sudah ada

### 4. Fungsi Hapus Event
```javascript
const handleDeleteEvent = (id) => {
  const eventName = events.find(e => e.id === id)?.name;
  setEvents(events.filter(e => e.id !== id));
  showNotification('success', `Event "${eventName}" berhasil dihapus!`);
};
```

**Kegunaan**: Menghapus event dari daftar

### 5. Fungsi Tambah Peserta
```javascript
const handleAddParticipant = (eventId, participant) => {
  const updatedEvents = events.map(event => {
    if (event.id === eventId) {
      return {
        ...event,
        participants: [...event.participants, { ...participant, id: Math.random() }]
      };
    }
    return event;
  });
  setEvents(updatedEvents);
  showNotification('success', `Peserta "${participant.name}" berhasil ditambahkan!`);
};
```

**Kegunaan**: Menambahkan peserta ke event tertentu

### 6. Fungsi Filter Events
```javascript
const filteredEvents = events.filter(event => {
  const matchCategory = categoryFilter === 'Semua' || event.category === categoryFilter;
  const matchSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                     event.location.toLowerCase().includes(searchTerm.toLowerCase());
  return matchCategory && matchSearch;
});
```

**Kegunaan**: Menyaring event berdasarkan kategori dan pencarian

### 7. Fungsi Perhitungan Statistik
```javascript
const calculateStatistics = () => {
  const totalEvents = events.length;
  const totalParticipants = events.reduce((sum, event) => sum + event.participants.length, 0);
  const averageParticipants = totalEvents > 0 ? (totalParticipants / totalEvents).toFixed(1) : 0;
  const totalCapacity = events.reduce((sum, event) => sum + event.maxParticipants, 0);
  const capacityUtilization = totalCapacity > 0 ? ((totalParticipants / totalCapacity) * 100).toFixed(1) : 0;

  return {
    totalEvents,
    totalParticipants,
    averageParticipants,
    totalCapacity,
    capacityUtilization
  };
};
```

**Kegunaan**: Menghitung dan menampilkan statistik aplikasi

### 8. Fungsi Notifikasi
```javascript
const showNotification = (type, message) => {
  setNotification({ type, message });
  setTimeout(() => setNotification({ type: '', message: '' }), 3000);
};
```

**Kegunaan**: Menampilkan pesan notifikasi yang otomatis hilang setelah 3 detik

## 🖱️ Event Handling

### Input Changes
```javascript
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: name === 'maxParticipants' ? parseInt(value) || '' : value
  }));
};
```

### Form Submit
```javascript
const handleSubmit = (e) => {
  e.preventDefault();
  if (!validateForm()) return;
  // Process form...
};
```

### Button Clicks
```javascript
<button onClick={() => onEdit(event.id)}>✏️</button>
<button onClick={() => setEditingEventId(null)}>Batal</button>
```

### Conditional Rendering
```javascript
{expandedEvent && (
  <div className="participants-section">
    <ParticipantList {...props} />
  </div>
)}
```

## 🎯 DOM Manipulation

### Mengubah Class Elements
```javascript
<div className={errors.name ? 'input-error' : ''}>
  <input className={errors.name ? 'input-error' : ''} />
</div>
```

### Menambah/Menghapus Elemen
```javascript
{events.length === 0 ? (
  <div className="empty-state">
    <p>Tidak ada event</p>
  </div>
) : (
  <div className="events-grid">
    {events.map(event => <EventCard key={event.id} {...props} />)}
  </div>
)}
```

### Mengubah Teks & Konten
```javascript
<h2>{initialData ? '✏️ Edit Event' : '➕ Event Baru'}</h2>
<span className="detail-icon">{event.category}</span>
<div className="stat-value">{stats.totalEvents}</div>
```

## 🔄 React Hooks yang Digunakan

### useState
Untuk mengelola state dalam komponen
```javascript
const [events, setEvents] = useState([]);
const [formData, setFormData] = useState({...});
const [errors, setErrors] = useState({});
```

### useEffect
Untuk sinkronisasi state dengan props (edit event)
```javascript
useEffect(() => {
  if (initialData) {
    setFormData(initialData);
  }
}, [initialData]);
```

## 📊 Array Methods Implementation

### map() - Transform Data
```javascript
{events.map(event => (
  <EventCard key={event.id} event={event} />
))}
```

### filter() - Search & Filter
```javascript
const filteredEvents = events.filter(event => {
  return categoryFilter === 'Semua' || event.category === categoryFilter;
});
```

### reduce() - Calculate Statistics
```javascript
const totalParticipants = events.reduce((sum, event) => 
  sum + event.participants.length, 0
);
```

### find() - Find Single Item
```javascript
const eventName = events.find(e => e.id === id)?.name;
const editingEvent = events.find(e => e.id === editingEventId);
```

## ✅ Validasi & Error Handling

### Input Validation
- Check for empty strings
- Validate email format
- Check number constraints
- Conditional required fields

### Error Display
- Real-time error messages
- Clear error highlighting
- Error removal on edit

### User Confirmation
```javascript
if (window.confirm(`Hapus event "${event.name}"?`)) {
  onDelete();
}
```

## 🚀 Best Practices Implementasi

1. **Immutability**: Menggunakan spread operator untuk update state
2. **Pure Functions**: Fungsi tidak mengubah state langsung
3. **Component Composition**: Breaking down ke komponen kecil
4. **Event Delegation**: Menangani event dengan efficient
5. **Conditional Rendering**: Menampilkan konten berdasarkan state
6. **Error Boundaries**: Handling error dengan proper validation
7. **Performance**: Menggunakan key pada list items

## 📝 Contoh Penggunaan Lengkap

### Alur Tambah Event
```javascript
1. User isi form → onChange triggers → setFormData
2. User click submit → handleSubmit triggered
3. validateForm() check input
4. handleAddEvent() create new event dengan ID unik
5. setEvents() update state dengan spread operator
6. showNotification() tampilkan pesan sukses
7. Form reset untuk input baru
```

### Alur Edit Event
```javascript
1. User click edit button → setEditingEventId(id)
2. useEffect detect initialData change
3. setFormData(initialData) populate form
4. User ubah data → onChange triggers
5. User click submit → handleUpdateEvent
6. setEvents() dengan map() update event tertentu
7. setEditingEventId(null) back to add mode
```

---