// Project: Weather App with API Integration
// Details: Create a weather app that fetches real-time weather data from an external API (like OpenWeatherMap).

import { useState, useEffect } from "react";
import "./App.css";
import { useForm } from "react-hook-form";

function App() {
  const { register, handleSubmit } = useForm();

  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState("metric");

  const API_KEY = "8c4d64dbb42567072702bb006c3fc005";

  // Step 3: When value of city changes, it re-renders and fetches the data from API again and again
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${unit}`
        );
        if (!response.ok) {
          if (city == "") {
            throw new Error("");
          } else {
            throw new Error("City not found");
          }
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

  const isDayTime = () => {
    if (weatherData) {
      const currentTime = Date.now() / 1000;
      return (
        currentTime > weatherData.sys.sunrise &&
        currentTime < weatherData.sys.sunset
      );
    } else {
      return true;
    }
  };

  function currentTime(timezone) {
    const timeZone = timezone * 1000;
    const currentTime = new Date();

    const actualTime =
      currentTime.getTime() + currentTime.getTimezoneOffset() * 60000;
    const localTime = new Date(actualTime + timeZone);

    return localTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <>
      <div
        className={`flex justify-center items-center h-screen w-full text-center`}
      >
        <div
          className={`container bg-slate-600 w-1/2 text-white h-2/3 p-5 rounded-lg shadow-xl   ${
            isDayTime()
              ? "bg-gradient-to-r from-blue-500 to-blue-700"
              : "bg-black"
          }`}
        >
          <h1 className="text-3xl font-bold pt-5">Weather App</h1>

          <br />

          {/* Step 1: The form is submitted using React Hook Form */}
          <form
            action=""
            onSubmit={handleSubmit(onSubmit)}
            className="flex gap-5 justify-center"
          >
            <input
              type="text"
              placeholder="city"
              {...register("city", { required: true })}
              className={` rounded-sm text-center  ${
                isDayTime() ? "bg-gray-800" : "bg-slate-200 text-black"
              } `}
            />

            <input
              type="submit"
              value="submit"
              className={` hover:cursor-pointer h-7 w-20 rounded-xl  ${
                isDayTime()
                  ? "bg-gray-800 hover:bg-gray-900"
                  : "bg-slate-200 hover:bg-slate-100 text-black"
              } `}
            />
          </form>

          <br />

          {/* Step 5: If weatherData is obtained, it is displayed, if not, error message is displayed */}
          {error && <p style={{ color: "red" }}>{error}</p>}

          {weatherData && (
            <div className="text-lg">
              <p className="text-2xl font-bold">
                {weatherData.name}, {weatherData.sys.country}
              </p>

              <p>Longitute: {weatherData.coord.lon} </p>
              <p>Latitude: {weatherData.coord.lat}</p>

              <div className="border-t-2 border-gray-400 my-4"></div>

              <p>
                {new Date(weatherData.sys.sunrise * 1000).toLocaleDateString(
                  "en-US",
                  {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </p>

              <p>{currentTime(weatherData.timezone)}</p>

              {/* Converting date and time in readable format */}
              {/* <p>
                Sunrise:{" "}
                {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString(
                  "en-US",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
              </p> */}

              <br />
              <div className="text-xl font-semibold">
                {isDayTime() ? <p>Day Time</p> : <p>Night Time</p>}
              </div>

              <div className="border-t-2 border-gray-400 my-4"></div>

              <p className="text-xl">
                Weather Condition: {weatherData.weather[0].main}
              </p>

              <div className="flex justify-center">
                <img
                  src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                  alt={weatherData.weather[0].description}
                />
              </div>

              <p>Weather description: {weatherData.weather[0].description}</p>

              <br />

              <p>
                Temperature: {weatherData.main.temp}&deg;C /{" "}
                {((weatherData.main.temp*9/5) + 32).toFixed(2)}&deg;F
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
