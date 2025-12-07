import React from 'react';
import './ParticipantList.css';

function ParticipantList({ participants, onRemove }) {
  if (participants.length === 0) {
    return <p className="no-participants">Belum ada peserta</p>;
  }

  return (
    <div className="participant-list">
      <h5>Peserta yang Terdaftar ({participants.length})</h5>
      <ul className="participants-ul">
        {participants.map(participant => (
          <li key={participant.id} className="participant-item">
            <div className="participant-info">
              <div className="participant-name">{participant.name}</div>
              <div className="participant-details">
                <span className="detail-badge">{participant.email}</span>
                {participant.phone && (
                  <span className="detail-badge">{participant.phone}</span>
                )}
                {participant.attendanceType && (
                  <span className={`attendance-badge attendance-${participant.attendanceType}`}>
                    {participant.attendanceType}
                  </span>
                )}
              </div>
            </div>
            <button
              className="remove-participant-btn"
              onClick={() => {
                if (window.confirm(`Hapus peserta "${participant.name}"?`)) {
                  onRemove(participant.id);
                }
              }}
              title="Hapus peserta"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ParticipantList;
