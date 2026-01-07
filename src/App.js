import { useEffect, useState } from 'react';

function App() {
  const [city, setCity] = useState("Kanpur");
  const [weather, setWeather] = useState(null);

  const currentDate = new Date();
  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];
  const month = months[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes().toString().padStart(2, "0");
  const formattedTime = `${hours % 12 || 12}:${minutes} ${hours >= 12 ? "PM" : "AM"}`;
  const formattedDate = `${month} ${day}, ${year}`;

  const API_KEY = "44b67479646d0645fd52402e61dba5f5";
  const fetchWeather = async () => {
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    response = await response.json();
    setWeather(response);
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  // 🌐 Responsive inline styles
  const containerStyle = {
    background: "linear-gradient(to bottom right, #4facfe, #00f2fe)",
    width: "100vw",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "1rem",
    boxSizing: "border-box",
  };

  const cardStyle = {
    backgroundColor: "white",
    borderRadius: "20px",
    padding: "2rem",
    width: "100%",
    maxWidth: "420px",
    textAlign: "center",
    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
    fontFamily: "sans-serif",
    boxSizing: "border-box",
  };

  const tempStyle = {
    fontSize: "3.5rem",
    fontWeight: "bold",
    margin: "0.5rem 0",
    color: "#333",
  };

  const conditionRow = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "0.5rem",
    marginBottom: "1rem",
  };

  const iconStyle = {
    width: "60px",
    height: "60px",
  };

  const conditionStyle = {
    fontSize: "1.2rem",
    color: "#555",
  };

  const locationStyle = {
    fontSize: "1rem",
    color: "#777",
    marginBottom: "1rem",
  };

  const inputStyle = {
    width: "100%",
    padding: "0.7rem",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    textAlign: "center",
    marginBottom: "0.8rem",
    boxSizing: "border-box",
  };

  const buttonStyle = {
    padding: "0.7rem",
    fontSize: "1rem",
    backgroundColor: "#4facfe",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    width: "100%",
    boxSizing: "border-box",
    fontWeight: "bold",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={{ fontSize: "0.9rem", color: "#555" }}>{formattedDate}</div>
        {weather && (
          <>
            <div style={tempStyle}>{Math.round(weather.main.temp)}°C</div>
            <div style={conditionRow}>
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="Weather Icon"
                style={iconStyle}
              />
              <div style={conditionStyle}>{weather.weather[0].main}</div>
            </div>
            <div style={locationStyle}>
              {weather.name} • {formattedTime}
            </div>
          </>
        )}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter City"
            style={inputStyle}
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit" style={buttonStyle}>Search</button>
        </form>
      </div>
    </div>
  );
}

export default App;
