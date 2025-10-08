import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;

export default function Forecast() {
  const { city } = useParams();
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetchForecast(city);
  }, [city]);

  const fetchForecast = async (cityName) => {
    try {
      setError(null);
      const { data } = await axios.get(
        "https://api.weatherapi.com/v1/forecast.json",
        {
          params: { key: API_KEY, q: cityName, days: 5, aqi: "no", alerts: "no" },
        }
      );
      setForecast(data.forecast.forecastday);
    } catch (err) {
      setError(err.response?.data?.error?.message || err.message);
    }
  };

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  if (error) return <div className="error">{error}</div>;
  if (!forecast) return <div className="loading">Loading...</div>;

  return (
    <div className={`forecast-container ${darkMode ? "dark" : ""}`}>
      <div className="header">
        <h2>3-Day Forecast for {city}</h2>
        <div>
          <Link to="/" className="back-btn">🏠 Home</Link>
          
        </div>
      </div>

      <div className="forecast-grid">
        {forecast.map((day) => (
          <div key={day.date} className="forecast-card">
            <h3>{new Date(day.date).toDateString()}</h3>
            <img src={day.day.condition.icon} alt={day.day.condition.text} />
            <p>{day.day.condition.text}</p>
            <p>🌡️ {day.day.maxtemp_c}°C / {day.day.mintemp_c}°C</p>
            <p>💧 {day.day.avghumidity}% | 💨 {day.day.maxwind_kph} km/h</p>
          </div>
        ))}
      </div>
    </div>
  );
}
