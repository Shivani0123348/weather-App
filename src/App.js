import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [city, setcity] = useState("Kanpur");
  const [weather, setweather] = useState(null);

  const currentDate = new Date();
  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];
  const month = months[currentDate.getMonth()];
  const year = currentDate.getFullYear();
  const formattedDate = `${month} / ${year}`;

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

  // 📱 Responsive inline styles
  const containerStyle = {
    backgroundColor: "#add8e6",
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
    fontFamily: "sans-serif",
    boxSizing: "border-box",
  };

  const dateStyle = {
    fontSize: "4vw",
    color: "#555",
    marginBottom: "2vw",
  };

  const titleStyle = {
    fontSize: "5vw",
    fontWeight: "bold",
    marginBottom: "2vw",
    color: "#333",
  };

  const iconStyle = {
    width: "30%",
    maxWidth: "100px",
    marginBottom: "2vw",
  };

  const tempStyle = {
    fontSize: "8vw",
    fontWeight: "bold",
    marginBottom: "1vw",
    color: "#333",
  };

  const conditionStyle = {
    fontSize: "4vw",
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
    marginBottom: "2vw",
  };

  const buttonStyle = {
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
        <div style={dateStyle}>{formattedDate}</div>
        <div style={titleStyle}>Keeper</div>
        <img
          src="https://openweathermap.org/img/wn/10d@2x.png"
          alt="Weather Icon"
          style={iconStyle}
        />
        {weather && (
          <>
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
            onChange={(e) => setcity(e.target.value)}
          />
          <button type="submit" style={buttonStyle}>SUBMIT</button>
        </form>
      </div>
    </div>
  );
}

export default App;
