import React from 'react';
import EventCard from './EventCard';
import './EventList.css';

function EventList({ events, onEdit, onDelete, onAddParticipant, onRemoveParticipant }) {
  return (
    <div className="event-list">
      <div className="event-list-header">
        <h2>📋 Daftar Event ({events.length})</h2>
      </div>

      {events.length === 0 ? (
        <div className="empty-list-message">
          <p>Belum ada event. Buat event baru untuk memulai!</p>
        </div>
      ) : (
        <div className="events-grid">
          {events.map(event => (
            <EventCard
              key={event.id}
              event={event}
              onEdit={() => onEdit(event.id)}
              onDelete={() => onDelete(event.id)}
              onAddParticipant={(participant) => onAddParticipant(event.id, participant)}
              onRemoveParticipant={(participantId) => onRemoveParticipant(event.id, participantId)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default EventList;
