// Project 3: Weather App with API Integration
// Details: Create a weather app that fetches real-time weather data from an external API (like OpenWeatherMap).
// Requirements:
// Input field to enter the city name.
// Fetch and display temperature, humidity, and weather description.
// Display loading or error messages while data is being fetched.
// Style the app based on the weather (e.g., sunny, rainy).

// API key = 8c4d64dbb42567072702bb006c3fc005
// API call = https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("Kathmandu");
  const [error, setError] = useState(null)

  const API_KEY = "8c4d64dbb42567072702bb006c3fc005";

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        if (!response.ok) {
          throw new Error("City not found");
        }
        const data = await response.json();
        setWeatherData(data);
        setError(null);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchWeatherData();
    console.log(weatherData);

  }, [city]);

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  return (
    <>
      <h1>Weather App</h1>
      <input type="text" value={city} onChange={handleChange} />

      {error && <p style={{color:"red"}}></p>}

      {weatherData && (

        <div>
            <p>Location: {weatherData.name}</p>
            <p>Country: {weatherData.sys.country}</p>

            <p>Co-ordinates: <br></br>Longitute: {weatherData.coord.lon} & Latitude: {weatherData.coord.lat}</p>

            <p>Temperature: {weatherData.main.temp} &deg;C</p>
        </div>
      )}
    </>
  );
}

export default App;