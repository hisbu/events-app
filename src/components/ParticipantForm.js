import React, { useState } from 'react';
import './ParticipantForm.css';

function ParticipantForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    affiliationCheckbox: false,
    affiliation: '',
    attendanceType: 'offline'
  });

  const [errors, setErrors] = useState({});

  // Fungsi validasi form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nama peserta wajib diisi';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email wajib diisi';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'No. telepon wajib diisi';
    }

    if (formData.affiliationCheckbox && !formData.affiliation.trim()) {
      newErrors.affiliation = 'Asosiasi/Institusi wajib diisi jika dipilih';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
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

    const participantData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      affiliation: formData.affiliationCheckbox ? formData.affiliation : '',
      attendanceType: formData.attendanceType
    };

    onSubmit(participantData);

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      affiliationCheckbox: false,
      affiliation: '',
      attendanceType: 'offline'
    });
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="participant-form">
      <h4>Tambah Peserta Baru</h4>

      <div className="form-group-small">
        <label htmlFor="name">Nama *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nama peserta"
          className={errors.name ? 'input-error' : ''}
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      <div className="form-group-small">
        <label htmlFor="email">Email *</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="email@example.com"
          className={errors.email ? 'input-error' : ''}
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      <div className="form-group-small">
        <label htmlFor="phone">No. Telepon *</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="08xx-xxxx-xxxx"
          className={errors.phone ? 'input-error' : ''}
        />
        {errors.phone && <span className="error-message">{errors.phone}</span>}
      </div>

      {/* Checkbox untuk Asosiasi/Institusi */}
      <div className="form-group-small checkbox-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="affiliationCheckbox"
            checked={formData.affiliationCheckbox}
            onChange={handleChange}
          />
          <span>Saya mewakili asosiasi/institusi</span>
        </label>
      </div>

      {/* Input Asosiasi (Conditional) */}
      {formData.affiliationCheckbox && (
        <div className="form-group-small">
          <label htmlFor="affiliation">Asosiasi/Institusi *</label>
          <input
            type="text"
            id="affiliation"
            name="affiliation"
            value={formData.affiliation}
            onChange={handleChange}
            placeholder="Nama institusi"
            className={errors.affiliation ? 'input-error' : ''}
          />
          {errors.affiliation && <span className="error-message">{errors.affiliation}</span>}
        </div>
      )}

      {/* Radio Button untuk Tipe Kehadiran */}
      <div className="form-group-small radio-group">
        <label>Tipe Kehadiran:</label>
        <div className="radio-options">
          <label className="radio-label">
            <input
              type="radio"
              name="attendanceType"
              value="offline"
              checked={formData.attendanceType === 'offline'}
              onChange={handleChange}
            />
            <span>Offline</span>
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="attendanceType"
              value="online"
              checked={formData.attendanceType === 'online'}
              onChange={handleChange}
            />
            <span>Online</span>
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="attendanceType"
              value="hybrid"
              checked={formData.attendanceType === 'hybrid'}
              onChange={handleChange}
            />
            <span>Hybrid</span>
          </label>
        </div>
      </div>

      <div className="form-buttons-small">
        <button type="submit" className="btn-small btn-submit">
          Tambah Peserta
        </button>
        <button type="button" onClick={onCancel} className="btn-small btn-cancel">
          Batal
        </button>
      </div>
    </form>
  );
}

export default ParticipantForm;
