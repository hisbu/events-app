import React, { useState, useEffect } from 'react';
import './Weather.css';

const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

function Weather() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState('Jakarta');
  const [isEditing, setIsEditing] = useState(false);
  const [locationInput, setLocationInput] = useState('Jakarta');

  const fetchWeather = async (query) => {
    try {
      setLoading(true);

      if (!WEATHER_API_KEY) {
        setError('API key tidak ditemukan. Konfigurasi .env.local dengan REACT_APP_WEATHER_API_KEY');
        setLoading(false);
        return;
      }

      let qParam = '';
      if (typeof query === 'object' && query?.lat && query?.lon) {
        qParam = `${query.lat},${query.lon}`;
      } else {
        qParam = query || location;
      }

      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${encodeURIComponent(qParam)}&aqi=no`
      );
      const data = await response.json();
      if (data && data.current) {
        setWeather(data.current);
        if (data.location && data.location.name) setLocation(data.location.name);
        setError(null);
      } else if (data && data.error) {
        setError(data.error.message || 'Lokasi tidak ditemukan');
      }
    } catch (err) {
      setError('Gagal memuat data cuaca');
      console.error('Weather API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchWeather(location);
    // Refresh weather every 30 minutes
    const interval = setInterval(() => fetchWeather(location), 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, [location]);

  // Try to get user geolocation on mount (will prompt permission)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          fetchWeather({ lat: latitude, lon: longitude });
        },
        (err) => {
          // ignore - user can still manually search or click button
          console.info('Geolocation not available or permission denied', err);
        },
        { timeout: 10000 }
      );
    }
  }, []);

  const useCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation tidak didukung oleh browser Anda');
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        fetchWeather({ lat: latitude, lon: longitude });
        setIsEditing(false);
      },
      (err) => {
        setError('Izin lokasi ditolak atau lokasi tidak tersedia');
        setLoading(false);
        console.error('Geolocation error', err);
      },
      { timeout: 10000 }
    );
  };

  const getWeatherIcon = (condition) => {
    // WeatherAPI condition codes
    const conditionText = condition?.toLowerCase() || '';
    
    if (conditionText.includes('clear') || conditionText.includes('sunny')) return '☀️';
    if (conditionText.includes('partly cloudy')) return '🌤️';
    if (conditionText.includes('cloudy') || conditionText.includes('overcast')) return '☁️';
    if (conditionText.includes('mist') || conditionText.includes('fog')) return '🌫️';
    if (conditionText.includes('drizzle')) return '🌧️';
    if (conditionText.includes('rain') || conditionText.includes('shower')) return '🌧️';
    if (conditionText.includes('snow') || conditionText.includes('sleet')) return '❄️';
    if (conditionText.includes('thunder') || conditionText.includes('storm')) return '⛈️';
    return '🌤️';
  };

  const getWeatherDescription = (condition) => {
    const conditionText = condition?.toLowerCase() || '';
    
    if (conditionText.includes('clear') || conditionText.includes('sunny')) return 'Cerah';
    if (conditionText.includes('partly cloudy')) return 'Sebagian Cerah';
    if (conditionText.includes('cloudy')) return 'Berawan';
    if (conditionText.includes('overcast')) return 'Mendung';
    if (conditionText.includes('mist') || conditionText.includes('fog')) return 'Berkabut';
    if (conditionText.includes('drizzle')) return 'Gerimis';
    if (conditionText.includes('rain')) return 'Hujan';
    if (conditionText.includes('shower')) return 'Hujan Ringan';
    if (conditionText.includes('snow')) return 'Salju';
    if (conditionText.includes('sleet')) return 'Hujan Salju';
    if (conditionText.includes('thunder') || conditionText.includes('storm')) return 'Badai Petir';
    return condition || 'Tidak Diketahui';
  };

  if (loading) {
    return (
      <div className="weather-widget">
        <div className="weather-header">Cuaca</div>
        <div className="weather-loading">Memuat...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="weather-widget">
        <div className="weather-header">
          <span>Cuaca</span>
          <div style={{display: 'flex', gap: 8}}>
            <button
              className="use-location-btn"
              onClick={useCurrentLocation}
              title="Gunakan lokasi saat ini"
            >
              📍
            </button>
            <button
              className="edit-location-btn"
              onClick={() => setIsEditing(true)}
              title="Ganti lokasi"
            >
              ✎
            </button>
          </div>
        </div>
        <div className="weather-error">{error}</div>
        {isEditing && (
          <div className="location-editor">
            <input
              type="text"
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
              placeholder="Masukkan nama lokasi"
              className="location-input"
            />
            <div className="location-buttons">
              <button
                onClick={() => {
                  fetchWeather(locationInput);
                  setIsEditing(false);
                }}
                className="location-btn-save"
              >
                Cari
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="location-btn-cancel"
              >
                Batal
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (!weather) {
    return null;
  }

  return (
    <div className="weather-widget">
      <div className="weather-header">
        <span>Cuaca {location}</span>
        <div style={{display: 'flex', gap: 8}}>
          <button
            className="use-location-btn"
            onClick={useCurrentLocation}
            title="Gunakan lokasi saat ini"
          >
            📍
          </button>
          <button
            className="edit-location-btn"
            onClick={() => setIsEditing(true)}
            title="Ganti lokasi"
          >
            ✎
          </button>
        </div>
      </div>

      {isEditing && (
        <div className="location-editor">
          <input
            type="text"
            value={locationInput}
            onChange={(e) => setLocationInput(e.target.value)}
            placeholder="Masukkan nama lokasi"
            className="location-input"
          />
          <div className="location-buttons">
            <button
              onClick={() => {
                fetchWeather(locationInput);
                setIsEditing(false);
              }}
              className="location-btn-save"
            >
              Cari
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="location-btn-cancel"
            >
              Batal
            </button>
          </div>
        </div>
      )}

      <div className="weather-content">
        <div className="weather-icon">
          {getWeatherIcon(weather.condition?.text)}
        </div>
        <div className="weather-info">
          <div className="weather-temp">
            {Math.round(weather.temp_c)}°C
          </div>
          <div className="weather-description">
            {getWeatherDescription(weather.condition?.text)}
          </div>
          <div className="weather-details">
            <div className="weather-detail">
              <span className="label">Angin:</span>
              <span className="value">{Math.round(weather.wind_kph)} km/h</span>
            </div>
            <div className="weather-detail">
              <span className="label">Kelembaban:</span>
              <span className="value">{weather.humidity}%</span>
            </div>
          </div>
          <div className="weather-update">
            Diperbarui: {new Date(weather.last_updated).toLocaleTimeString('id-ID')}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;
