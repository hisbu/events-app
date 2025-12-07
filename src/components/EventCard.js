import React, { useState } from 'react';
import ParticipantForm from './ParticipantForm';
import ParticipantList from './ParticipantList';
import './EventCard.css';

function EventCard({ event, onEdit, onDelete, onAddParticipant, onRemoveParticipant }) {
  const [showParticipantForm, setShowParticipantForm] = useState(false);
  const [expandedEvent, setExpandedEvent] = useState(false);

  const isFull = event.participants.length >= event.maxParticipants;

  // Fungsi untuk format tanggal
  const formatDate = (dateString) => {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  return (
    <div className="event-card">
      <div className="event-card-header">
        <div className="event-title-section">
          <h3>{event.name}</h3>
          <span className={`event-category badge-${event.category.toLowerCase()}`}>
            {event.category}
          </span>
        </div>
        <div className="event-actions">
          <button
            className="action-btn edit-btn"
            onClick={onEdit}
            title="Edit event"
          >
            ✏️
          </button>
          <button
            className="action-btn delete-btn"
            onClick={() => {
              if (window.confirm(`Hapus event "${event.name}"?`)) {
                onDelete();
              }
            }}
            title="Hapus event"
          >
            🗑️
          </button>
        </div>
      </div>

      <div className="event-card-body">
        <div className="event-detail">
          <span className="detail-icon">📅</span>
          <span>{formatDate(event.date)}</span>
        </div>

        <div className="event-detail">
          <span className="detail-icon">🕐</span>
          <span>{event.time}</span>
        </div>

        <div className="event-detail">
          <span className="detail-icon">📍</span>
          <span>{event.location}</span>
        </div>

        <div className="event-detail">
          <span className="detail-icon">📝</span>
          <p className="event-description">{event.description}</p>
        </div>

        {/* Informasi Peserta */}
        <div className="participants-info">
          <div className="participant-count">
            <strong>Peserta:</strong> {event.participants.length} / {event.maxParticipants}
          </div>
          <div className="progress-bar">
            <div
              className={`progress-fill ${isFull ? 'full' : ''}`}
              style={{
                width: `${(event.participants.length / event.maxParticipants) * 100}%`
              }}
            />
          </div>
        </div>

        {/* Toggle Peserta */}
        <button
          className="toggle-participants-btn"
          onClick={() => setExpandedEvent(!expandedEvent)}
        >
          {expandedEvent ? '▼ Sembunyikan Peserta' : '▶ Lihat Peserta'}
        </button>

        {/* Daftar Peserta (Expandable) */}
        {expandedEvent && (
          <div className="participants-section">
            <ParticipantList
              participants={event.participants}
              onRemove={onRemoveParticipant}
            />
          </div>
        )}

        {/* Form Tambah Peserta */}
        {!showParticipantForm ? (
          <button
            className={`btn btn-add-participant ${isFull ? 'disabled' : ''}`}
            onClick={() => setShowParticipantForm(true)}
            disabled={isFull}
            title={isFull ? 'Peserta penuh' : 'Tambah peserta'}
          >
            {isFull ? '❌ Peserta Penuh' : '➕ Tambah Peserta'}
          </button>
        ) : (
          <div className="participant-form-container">
            <ParticipantForm
              onSubmit={(participant) => {
                onAddParticipant(participant);
                setShowParticipantForm(false);
              }}
              onCancel={() => setShowParticipantForm(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default EventCard;
