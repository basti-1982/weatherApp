import { useState, useEffect } from "react";
import { DateTime } from "luxon";
import "../styles/WeatherApp.css";
import "../styles/Header.css";
import Header from "./Header";
import { getFilteredForecast } from "./FilteredForecast";
import { fetchWeatherData } from "./fetchWeatherData";
import WeatherInfo from "./WeatherInfo";
import Forecast from "./Forecast";
import CityForm from "./CityForm";
import ForecastControls from "./ForecastControls";

function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isCelsius, setIsCelsius] = useState(true);
  const [forecastDays, setForecastDays] = useState("");
  const [isLocationRequested, setIsLocationRequested] = useState(false);
  const [showForecast, setShowForecast] = useState(false);

  useEffect(() => {
    if (!isLocationRequested) {
      const askForLocation = async () => {
        const allowLocation = window.confirm(
          "Möchten Sie Ihren Standort teilen, um das Wetter in Ihrer Region zu sehen?"
        );
        if (allowLocation) {
          requestLocation();
          setIsLocationRequested(true);
        }
      };
      askForLocation();
    }
  }, [isLocationRequested]);

  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const { weatherData, forecastData } = await fetchWeatherData({
              latitude,
              longitude,
              isCelsius,
            });
            setWeather(weatherData);
            setForecast(forecastData);
            setShowForecast(false);
            setError(null);
          } catch (err) {
            setError("Fehler beim Abrufen der Wetterdaten.");
          }
        },
        () => {
          setError("Standortzugriff verweigert. Bitte Stadt manuell eingeben.");
        }
      );
    } else {
      setError("Geolocation wird von Ihrem Browser nicht unterstützt.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (city.trim() !== "") {
      try {
        const { weatherData, forecastData } = await fetchWeatherData({
          cityName: city,
          isCelsius,
        });
        setWeather(weatherData);
        setForecast(forecastData);
        setShowForecast(false);
        setError(null);
      } catch (err) {
        setError("Wetterdaten konnten nicht abgerufen werden.");
      }
    } else {
      setError("Bitte geben Sie eine gültige Stadt ein.");
    }
  };

  const toggleTemperatureUnit = () => setIsCelsius(!isCelsius);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const handleForecastChange = (e) => {
    setForecastDays(Number(e.target.value));
    setShowForecast(true);
  };

  const weatherClass = weather?.weather[0]?.main.toLowerCase() || "";

  const getLocalTime = (timezoneOffset) => {
    const offsetHours = timezoneOffset / 3600;
    return DateTime.utc()
      .plus({ hours: offsetHours })
      .toLocaleString(DateTime.DATETIME_MED);
  };

  return (
    <div
      className={`weather-container ${
        isDarkMode ? "dark-mode" : ""
      } ${weatherClass}`}>
      <Header
        toggleDarkMode={toggleDarkMode}
        toggleTemperatureUnit={toggleTemperatureUnit}
        isDarkMode={isDarkMode}
        isCelsius={isCelsius}
      />
      <h1 className="app-title">Wetter App</h1>
      <CityForm city={city} setCity={setCity} handleSubmit={handleSubmit} />
      {error && <p>{error}</p>}
      {weather && (
        <WeatherInfo
          weather={weather}
          isCelsius={isCelsius}
          getLocalTime={getLocalTime}
        />
      )}
      {weather && (
        <ForecastControls
          forecastDays={forecastDays}
          handleForecastChange={handleForecastChange}
        />
      )}
      {showForecast && forecast && forecastDays && (
        <Forecast
          forecast={forecast}
          forecastDays={forecastDays}
          isCelsius={isCelsius}
          getFilteredForecast={getFilteredForecast}
        />
      )}
    </div>
  );
}

export default WeatherApp;
