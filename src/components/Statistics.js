import React from 'react';
import './Statistics.css';

function Statistics({ events }) {
  // Fungsi untuk menghitung statistik
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

  const stats = calculateStatistics();

  return (
    <div className="statistics-card">
      <h2 className="stats-title">📊 Statistik</h2>

      <div className="stats-grid">
        <div className="stat-item">
          <div className="stat-icon">📅</div>
          <div className="stat-content">
            <div className="stat-label">Total Event</div>
            <div className="stat-value">{stats.totalEvents}</div>
          </div>
        </div>

        <div className="stat-item">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <div className="stat-label">Total Peserta</div>
            <div className="stat-value">{stats.totalParticipants}</div>
          </div>
        </div>

        <div className="stat-item">
          <div className="stat-icon">📈</div>
          <div className="stat-content">
            <div className="stat-label">Rata-rata Peserta</div>
            <div className="stat-value">{stats.averageParticipants}</div>
          </div>
        </div>

        <div className="stat-item">
          <div className="stat-icon">🎯</div>
          <div className="stat-content">
            <div className="stat-label">Utilisasi Kapasitas</div>
            <div className="stat-value">{stats.capacityUtilization}%</div>
          </div>
        </div>
      </div>

      <div className="stats-details">
        <div className="detail-row">
          <span>Total Kapasitas:</span>
          <strong>{stats.totalCapacity}</strong>
        </div>
        <div className="detail-row">
          <span>Ketersediaan Tempat:</span>
          <strong className={stats.totalCapacity - stats.totalParticipants > 0 ? 'available' : 'unavailable'}>
            {stats.totalCapacity - stats.totalParticipants}
          </strong>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
