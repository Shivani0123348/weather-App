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
  const Day = currentDate.getDate();
  const year = currentDate.getFullYear();
  const formattedDate = `${month} ${Day} ${year}`;

  const API_KEY = "44b67479646d0645fd52402e61dba5f5";
  const fetchweather = async () => {
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
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

  // ✅ Responsive inline styles
  const containerStyle = {
    backgroundColor: "lightblue",
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "1rem",
  };

  const cardStyle = {
    backgroundColor: "white",
    width: "90%",          // mobile default
    maxWidth: "400px",     // prevents stretching on large screens
    minHeight: "60%",
    boxShadow: "0px 4px 8px rgba(0,0,0,0.3)",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    alignItems: "center",
    borderRadius: "8px",
    padding: "1rem",
  };

  const imgStyle = {
    height: "auto",
    width: "40%",
    maxWidth: "120px",
    borderRadius: "50%",
  };

  const inputStyle = {
    width: "90%",
    textAlign: "center",
    marginBottom: "0.5rem",
    padding: "0.5rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
  };

  const buttonStyle = {
    backgroundColor: "black",
    color: "white",
    width: "50%",
    padding: "0.5rem",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <p style={{ color: "black" }}>{formattedDate}</p>
        {weather && (
          <>
            <h3 style={{ color: "black" }}>{weather.name}</h3>
            <img
              src="https://imgs.search.brave.com/CEVb94gVCaYTRzUURsMPoG_kipzy9q7BevWR7rsDk9Y/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzE1Lzc5LzUzLzQw/LzM2MF9GXzE1Nzk1/MzQwNjRfUkpKQ2ts/ODNqaTB1dFEwZEVZ/Tko0QnRuTEVwamhM/U0guanBn"
              alt="Current Weather Condition"
              style={imgStyle}
            />
            <h1 style={{ color: "black" }}>{weather.main.humidity}</h1>
            <p style={{ color: "black" }}>{weather.weather[0].main}</p>
            <form onSubmit={handleSubmit} style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <input
                type="text"
                placeholder="Enter City"
                style={inputStyle}
                value={city}
                onChange={(e) => setcity(e.target.value)}
              />
              <button type="submit" style={buttonStyle}>GET</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
