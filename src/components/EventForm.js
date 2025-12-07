import React, { useState, useEffect } from 'react';
import './EventForm.css';

function EventForm({ onSubmit, initialData, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    category: 'Workshop',
    location: '',
    description: '',
    maxParticipants: 30
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  // Fungsi untuk validasi form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nama event wajib diisi';
    }
    if (!formData.date) {
      newErrors.date = 'Tanggal wajib diisi';
    }
    if (!formData.time) {
      newErrors.time = 'Waktu wajib diisi';
    }
    if (!formData.location.trim()) {
      newErrors.location = 'Lokasi wajib diisi';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Deskripsi wajib diisi';
    }
    if (formData.maxParticipants <= 0) {
      newErrors.maxParticipants = 'Jumlah peserta harus lebih dari 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'maxParticipants' ? parseInt(value) || '' : value
    }));
    // Hapus error ketika user mulai edit
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (initialData) {
      onSubmit({ ...formData, id: initialData.id });
    } else {
      onSubmit(formData);
    }

    // Reset form
    setFormData({
      name: '',
      date: '',
      time: '',
      category: 'Workshop',
      location: '',
      description: '',
      maxParticipants: 30
    });
    setErrors({});
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      date: '',
      time: '',
      category: 'Workshop',
      location: '',
      description: '',
      maxParticipants: 30
    });
    setErrors({});
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div className="event-form-card">
      <h2 className="form-title">
        {initialData ? '✏️ Edit Event' : '➕ Event Baru'}
      </h2>

      <form onSubmit={handleSubmit} className="event-form">
        {/* Input Nama Event */}
        <div className="form-group">
          <label htmlFor="name">Nama Event *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Masukkan nama event"
            className={errors.name ? 'input-error' : ''}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        {/* Input Tanggal */}
        <div className="form-group">
          <label htmlFor="date">Tanggal *</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className={errors.date ? 'input-error' : ''}
          />
          {errors.date && <span className="error-message">{errors.date}</span>}
        </div>

        {/* Input Waktu */}
        <div className="form-group">
          <label htmlFor="time">Waktu *</label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className={errors.time ? 'input-error' : ''}
          />
          {errors.time && <span className="error-message">{errors.time}</span>}
        </div>

        {/* Select Kategori */}
        <div className="form-group">
          <label htmlFor="category">Kategori</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="Workshop">Workshop</option>
            <option value="Seminar">Seminar</option>
            <option value="Training">Training</option>
            <option value="Konferensi">Konferensi</option>
            <option value="Meetup">Meetup</option>
          </select>
        </div>

        {/* Input Lokasi */}
        <div className="form-group">
          <label htmlFor="location">Lokasi *</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Masukkan lokasi acara"
            className={errors.location ? 'input-error' : ''}
          />
          {errors.location && <span className="error-message">{errors.location}</span>}
        </div>

        {/* Input Deskripsi */}
        <div className="form-group">
          <label htmlFor="description">Deskripsi *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Masukkan deskripsi event"
            rows="3"
            className={errors.description ? 'input-error' : ''}
          />
          {errors.description && <span className="error-message">{errors.description}</span>}
        </div>

        {/* Input Jumlah Peserta Max */}
        <div className="form-group">
          <label htmlFor="maxParticipants">Max Peserta (Number) *</label>
          <input
            type="number"
            id="maxParticipants"
            name="maxParticipants"
            value={formData.maxParticipants}
            onChange={handleChange}
            min="1"
            className={errors.maxParticipants ? 'input-error' : ''}
          />
          {errors.maxParticipants && (
            <span className="error-message">{errors.maxParticipants}</span>
          )}
        </div>

        {/* Tombol Submit */}
        <div className="form-buttons">
          <button type="submit" className="btn btn-primary">
            {initialData ? 'Perbarui Event' : 'Tambah Event'}
          </button>
          {initialData && (
            <button type="button" onClick={handleCancel} className="btn btn-secondary">
              Batal
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default EventForm;
