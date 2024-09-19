// import { API_KEY } from "../config"; 

// export const fetchWeatherData = async ({ latitude, longitude, cityName, isCelsius }) => {
//     const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?${cityName ? `q=${cityName}` : `lat=${latitude}&lon=${longitude}`}&appid=${API_KEY}&units=${isCelsius ? 'metric' : 'imperial'}&lang=de`;
    
//     const weatherResponse = await fetch(weatherUrl);
//     if (!weatherResponse.ok) {
//       throw new Error(`Weather API request failed with status ${weatherResponse.status}`);
//     }
//     const weatherData = await weatherResponse.json();
  
//     const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?${cityName ? `q=${cityName}` : `lat=${latitude}&lon=${longitude}`}&appid=${API_KEY}&units=${isCelsius ? 'metric' : 'imperial'}&lang=de`;
  
//     const forecastResponse = await fetch(forecastUrl);
//     if (!forecastResponse.ok) {
//       throw new Error(`Forecast API request failed with status ${forecastResponse.status}`);
//     }
//     const forecastData = await forecastResponse.json();
  
//     return { weatherData, forecastData };
//   };
  

import { API_KEY } from "../config";

export const fetchWeatherData = async ({ latitude, longitude, cityName, isCelsius }) => {
  try {
    // Überprüfe, ob die Koordinaten oder der Stadtnamen vorhanden sind
    if (!latitude || !longitude) {
      if (!cityName) {
        throw new Error("Weder Standortkoordinaten noch Stadtname vorhanden.");
      }
    }

    // Erstelle die URLs für Wetter und Vorhersage
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?${cityName ? `q=${cityName}` : `lat=${latitude}&lon=${longitude}`}&appid=${API_KEY}&units=${isCelsius ? "metric" : "imperial"}&lang=de`;

    const weatherResponse = await fetch(weatherUrl);
    if (!weatherResponse.ok) {
      throw new Error(`Weather API request failed with status ${weatherResponse.status}`);
    }

    const weatherData = await weatherResponse.json();

    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?${cityName ? `q=${cityName}` : `lat=${latitude}&lon=${longitude}`}&appid=${API_KEY}&units=${isCelsius ? "metric" : "imperial"}&lang=de`;

    const forecastResponse = await fetch(forecastUrl);
    if (!forecastResponse.ok) {
      throw new Error(`Forecast API request failed with status ${forecastResponse.status}`);
    }

    const forecastData = await forecastResponse.json();

    return { weatherData, forecastData };
  } catch (error) {
    console.error("Fehler beim Abrufen der Wetterdaten:", error);
    throw error;
  }
};
