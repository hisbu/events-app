import React, { useState, useEffect } from 'react';
import EventForm from './components/EventForm';
import EventList from './components/EventList';
import Statistics from './components/Statistics';
import Weather from './components/Weather';
import './App.css';

function App() {
  const [events, setEvents] = useState(() => {
    try {
      const saved = localStorage.getItem('events');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse saved events from localStorage', e);
    }

    return [
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
          { id: 1, name: 'Budi', email: 'budi@example.com' },
          { id: 2, name: 'Santi', email: 'santi@example.com' }
        ]
      },
      {
        id: 2,
        name: 'Seminar Web Development',
        date: '2025-12-20',
        time: '14:00',
        category: 'Seminar',
        location: 'Auditorium',
        description: 'Tren terbaru dalam web development',
        maxParticipants: 100,
        participants: [
          { id: 3, name: 'Ahmad', email: 'ahmad@example.com' }
        ]
      }
    ];
  });

  // Persist events to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('events', JSON.stringify(events));
    } catch (e) {
      console.warn('Failed to save events to localStorage', e);
    }
  }, [events]);

  const [editingEventId, setEditingEventId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Semua');
  const [notification, setNotification] = useState({ type: '', message: '' });

  // Fungsi untuk menampilkan notifikasi
  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification({ type: '', message: '' }), 3000);
  };

  // Fungsi untuk tambah event
  const handleAddEvent = (newEvent) => {
    const event = {
      ...newEvent,
      id: Math.max(...events.map(e => e.id), 0) + 1,
      participants: []
    };
    setEvents([...events, event]);
    showNotification('success', `Event "${newEvent.name}" berhasil ditambahkan!`);
  };

  // Fungsi untuk update event
  const handleUpdateEvent = (updatedEvent) => {
    setEvents(events.map(e => e.id === updatedEvent.id ? updatedEvent : e));
    setEditingEventId(null);
    showNotification('success', `Event "${updatedEvent.name}" berhasil diperbarui!`);
  };

  // Fungsi untuk hapus event
  const handleDeleteEvent = (id) => {
    const eventName = events.find(e => e.id === id)?.name;
    setEvents(events.filter(e => e.id !== id));
    showNotification('success', `Event "${eventName}" berhasil dihapus!`);
  };

  // Fungsi untuk tambah peserta
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

  // Fungsi untuk hapus peserta
  const handleRemoveParticipant = (eventId, participantId) => {
    const updatedEvents = events.map(event => {
      if (event.id === eventId) {
        return {
          ...event,
          participants: event.participants.filter(p => p.id !== participantId)
        };
      }
      return event;
    });
    setEvents(updatedEvents);
    showNotification('success', 'Peserta berhasil dihapus!');
  };

  // Filter events berdasarkan kategori dan pencarian
  const filteredEvents = events.filter(event => {
    const matchCategory = categoryFilter === 'Semua' || event.category === categoryFilter;
    const matchSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       event.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  // Dapatkan event yang sedang diedit
  const editingEvent = events.find(e => e.id === editingEventId);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>📅 It'ts Event Scheduler</h1>
        <p>Kelola dan jadwalkan acara Anda dengan mudah</p>
      </header>

      {/* Notifikasi */}
      {notification.message && (
        <div className={`notification notification-${notification.type}`}>
          {notification.type === 'success' ? '✅' : '❌'} {notification.message}
        </div>
      )}

      <div className="app-content">
        <aside className="sidebar">
          <Weather />
          <EventForm
            onSubmit={editingEvent ? handleUpdateEvent : handleAddEvent}
            initialData={editingEvent}
            onCancel={() => setEditingEventId(null)}
          />
          <Statistics events={events} />
        </aside>

        <main className="main-content">
          <div className="filters-section">
            <div className="search-box">
              <input
                type="text"
                placeholder="Cari event atau lokasi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="category-filter">
              <label>Filter Kategori:</label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="filter-select"
              >
                <option value="Semua">Semua Kategori</option>
                <option value="Workshop">Workshop</option>
                <option value="Seminar">Seminar</option>
                <option value="Training">Training</option>
                <option value="Konferensi">Konferensi</option>
                <option value="Meetup">Meetup</option>
              </select>
            </div>
          </div>

          <EventList
            events={filteredEvents}
            onEdit={setEditingEventId}
            onDelete={handleDeleteEvent}
            onAddParticipant={handleAddParticipant}
            onRemoveParticipant={handleRemoveParticipant}
          />

          {filteredEvents.length === 0 && (
            <div className="empty-state">
              <p>Tidak ada event yang sesuai dengan filter Anda</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
