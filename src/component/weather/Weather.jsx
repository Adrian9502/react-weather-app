import { useState, useEffect } from "react";
import Search from "../search/Search";

export default function Weather() {
  useEffect(() => {
    fetchWeatherData("manila");
  }, []);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  async function fetchWeatherData(param) {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=0a118db40b67c7c8cf7465eb010b305c`
      );

      const data = await response.json();
      if (!response.ok) {
        alert("Error: invalid input");
        setLoading(false);
        return;
      }
      if (data) {
        setLoading(false);
        setWeatherData(data);
      }
    } catch (e) {
      setLoading(false);
      console.log("Error: ", e);
    }
  }

  function handleSearch(event) {
    event.preventDefault(); // Prevent the default form submission
    console.log("clicked");
    fetchWeatherData(search);
  }

  function getCurrentDate() {
    return new Date().toLocaleDateString("en-us", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  function getBackgroundClass(temp) {
    if (temp < 15) return "bg-primary text-light"; // Colder
    if (temp > 30) return "bg-warning text-dark"; // Hotter
    return "bg-secondary text-light"; // Moderate
  }

  return (
    <div className="container bg-dark rounded text-light text-center p-4">
      <h1>Weather App using API</h1>
      <Search
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />

      {loading ? (
        <div className="text-center my-4">
          <div className="spinner-border text-primary" role="status"></div>
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        weatherData && (
          <div className="card bg-light text-dark my-4">
            <div className="card-body">
              <h2 className="card-title">
                {weatherData.name}, <span>{weatherData.sys.country}</span>
              </h2>
              <div className="card-text">
                <p className="mb-1">{getCurrentDate()}</p>
                <h3 className="display-4 fw-medium">
                  {Math.round(weatherData.main.temp - 273.15)}°C
                </h3>
                <p className="text-capitalize">
                  {weatherData.weather[0].description}
                </p>
                <div className="weather-icon">
                  <img
                    src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                    alt={weatherData.weather[0].description}
                    className={`img-fluid rounded ${getBackgroundClass(
                      Math.round(weatherData.main.temp - 273.15)
                    )}`}
                  />
                </div>
                <div className="row mt-3">
                  <div className="col">
                    <p className="mb-1">Wind Speed</p>
                    <h4>{weatherData.wind.speed} m/s</h4>
                  </div>
                  <div className="col">
                    <p className="mb-1">Humidity</p>
                    <h4>{weatherData.main.humidity}%</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      )}
      <div className="text-start fst-italic">
        {/* credit */}
        <a
          className="text-decoration-none"
          href="https://openweathermap.org/api"
        >
          API provided by OpenWeather
        </a>
      </div>
    </div>
  );
}
