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
  const formattedDate = `${month} ${day} ${year}`;

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

  // ✅ Responsive styles
  const containerStyle = {
    backgroundColor: "#add8e6",
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
    maxWidth: "400px",
    textAlign: "center",
    boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
    fontFamily: "sans-serif",
    boxSizing: "border-box",
  };

  const dateStyle = {
    fontSize: "1rem",
    color: "#555",
    marginBottom: "0.5rem",
  };

  const cityStyle = {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "1rem",
  };

  const iconStyle = {
    width: "80px",
    height: "80px",
    objectFit: "contain",
    marginBottom: "0.5rem",
  };

  const tempStyle = {
    fontSize: "3rem",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "0.5rem",
  };

  const conditionStyle = {
    fontSize: "1.2rem",
    color: "#777",
    marginBottom: "1rem",
  };

  const inputStyle = {
    width: "100%",
    padding: "0.8rem",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    textAlign: "center",
    marginBottom: "0.8rem",
    boxSizing: "border-box",
  };

  const buttonStyle = {
    padding: "0.8rem",
    fontSize: "1rem",
    backgroundColor: "#000",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    width: "100%",
    boxSizing: "border-box",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={dateStyle}>{formattedDate}</div>
        {weather && (
          <>
            <div style={cityStyle}>{weather.name}</div>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="Weather Icon"
              style={iconStyle}
            />
            <div style={tempStyle}>{Math.round(weather.main.temp)}°</div>
            <div style={conditionStyle}>{weather.weather[0].main}</div>
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
          <button type="submit" style={buttonStyle}>GET</button>
        </form>
      </div>
    </div>
  );
}

export default App;
