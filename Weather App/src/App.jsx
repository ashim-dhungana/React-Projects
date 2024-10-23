// Project: Weather App with API Integration
// Details: Create a weather app that fetches real-time weather data from an external API (like OpenWeatherMap).

import { useState, useEffect } from "react";
import "./App.css";
import { useForm } from "react-hook-form";

function App() {
  const { register, handleSubmit } = useForm();

  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("Kathmandu");
  const [error, setError] = useState(null);

  const API_KEY = "8c4d64dbb42567072702bb006c3fc005";

  // Step 3: When value of city changes, it re-renders and fetches the data from API again and again
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

        // Step 4: When the data is received, 'weatherData' is updated with new data and used to display the weather information
        setWeatherData(data);
        setError(null);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchWeatherData();
    console.log(weatherData);
  }, [city]);

  // Step 2: The data obtained from the form updates the value of city and causes useEffect to re-render
  const onSubmit = (data) => {
    console.log(data);
    setCity(data.city);
  };

  return (
    <>
      <div>

        <h1>Weather App</h1>

        {/* Step 1: The form is submitted using React Hook Form */}
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="city"
            {...register("city", { value: "Kathmandu", required: true })}
          />

          <input type="submit" value="submit" />
        </form>

        {/* Step 5: If weatherData is obtained, it is displayed, if not, error message is displayed */}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {weatherData && (
          <div>
            <p>Location: {weatherData.name}</p>
            <p>Country: {weatherData.sys.country}</p>

            <p>
              Co-ordinates: <br></br>Longitute: {weatherData.coord.lon} &
              Latitude: {weatherData.coord.lat}
            </p>

            <p>Temperature: {weatherData.main.temp} &deg;C</p>
          </div>
        )}
      </div>
    </>
  );
}

export default App;