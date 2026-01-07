import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [city, setcity] = useState("Kanpur");
  const [weather, setweather] = useState(null);

  const currentDate = new Date();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes().toString().padStart(2, '0');
  const formattedTime = `${hours % 12 || 12}:${minutes} ${hours >= 12 ? 'PM' : 'AM'}`;

  const API_KEY = "44b67479646d0645fd52402e61dba5f5";
  const fetchweather = async () => {
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    response = await response.json();
    setweather(response);
    console.log(response);
  };

  useEffect(() => {
    fetchweather();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchweather();
  };

  // 📱 Responsive styles using inline logic
  const containerStyle = {
    background: "linear-gradient(to bottom right, #4facfe, #00f2fe)",
    width: "100vw",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "5vw",
    boxSizing: "border-box",
  };

  const cardStyle = {
    backgroundColor: "white",
    borderRadius: "20px",
    padding: "6vw",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
    boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
    color: "#333",
    fontFamily: "sans-serif",
    boxSizing: "border-box",
  };

  const tempStyle = {
    fontSize: "10vw", // scales with screen
    fontWeight: "bold",
    margin: "1vw 0",
    color: "#333",
  };

  const conditionStyle = {
    fontSize: "4vw",
    marginBottom: "1vw",
    color: "#555",
  };

  const locationStyle = {
    fontSize: "3.5vw",
    color: "#777",
    marginBottom: "2vw",
  };

  const inputStyle = {
    width: "100%",
    padding: "3vw",
    fontSize: "4vw",
    borderRadius: "8px",
    border: "1px solid #ccc",
    textAlign: "center",
    boxSizing: "border-box",
  };

  const buttonStyle = {
    marginTop: "2vw",
    padding: "3vw",
    fontSize: "4vw",
    backgroundColor: "#333",
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
        {weather && (
          <>
            <div style={tempStyle}>{Math.round(weather.main.temp)}°</div>
            <div style={conditionStyle}>{weather.weather[0].main}</div>
            <div style={locationStyle}>
              {weather.name} &nbsp; Current: {formattedTime}
            </div>
          </>
        )}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter City"
            style={inputStyle}
            value={city}
            onChange={(e) => setcity(e.target.value)}
          />
          <button type="submit" style={buttonStyle}>GET</button>
        </form>
      </div>
    </div>
  );
}

export default App;
