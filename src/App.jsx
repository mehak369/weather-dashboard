import React, { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./Home";
import Forecast from "./Forecast";
import "./style.css";

export default function App() {
  // Default values
  const [city, setCity] = useState("Delhi");
  const [country, setCountry] = useState("India");
  const [isDark, setIsDark] = useState(false);

  const navigate = useNavigate();

  // Input handlers
  const handleCityChange = (e) => setCity(e.target.value);
  const handleCountryChange = (e) => setCountry(e.target.value);

  // Navigate to forecast with "city,country"
  const handleSearch = () => {
    if (city.trim() && country.trim()) {
      navigate(`/forecast/${encodeURIComponent(`${city},${country}`)}`);
    }
  };

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <div className={`app-container ${isDark ? "dark" : "light"}`}>
      <header className="header">
        <h1>🌤️ Weather App</h1>
        <button className="toggle-btn" onClick={toggleTheme}>
          {isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </header>

      <nav>
        <Link to="/"><p>Home</p></Link> |{" "}
        <Link to={`/forecast/${encodeURIComponent(`${city},${country}`)}`}>
          Forecast
        </Link>
      </nav>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={handleCityChange}
        />
        <input
          type="text"
          placeholder="Enter country..."
          value={country}
          onChange={handleCountryChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <Routes>
        <Route path="/" element={<Home city={`${city},${country}`} />} />
        <Route path="/forecast/:city" element={<Forecast />} />
      </Routes>
    </div>
  );
}
