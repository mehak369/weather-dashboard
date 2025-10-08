import React, { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;

export default function Home({ city }) {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  // Fetch only current weather (not full forecast)
  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  const fetchWeather = async (cityName) => {
    try {
      setError(null);
      const { data } = await axios.get("https://api.weatherapi.com/v1/current.json", {
        params: { key: API_KEY, q: cityName, aqi: "yes" },
      });
      setWeather(data);
    } catch (err) {
      setError(err.response?.data?.error?.message || err.message);
    }
  };

  if (error) return <div className="error">{error}</div>;
  if (!weather) return <div className="loading">Loading...</div>;

  const { location, current } = weather;

  return (
    <div className="weather-card">
      <h2>
        {location.name}, {location.country}
      </h2>
      <div className="weather-details">
        <img src={current.condition.icon} alt={current.condition.text} />
        <h3>{current.condition.text}</h3>
        <p className="temp">🌡️ {current.temp_c}°C</p>
        <p>💨 Wind: {current.wind_kph} km/h</p>
        <p>💧 Humidity: {current.humidity}%</p>
        <p>🌫️ Air Quality Index: {current.air_quality["pm2_5"]?.toFixed(1)}</p>
        <p>⏰ Local Time: {location.localtime}</p>
      </div>
    </div>
  );
}
