import { API_KEY } from "../config"; 

export const fetchWeatherData = async ({ latitude, longitude, cityName, isCelsius }) => {
    // Validierung der Koordinaten
    if (latitude && (latitude < -90 || latitude > 90)) {
        throw new Error("Invalid latitude value");
    }
    if (longitude && (longitude < -180 || longitude > 180)) {
        throw new Error("Invalid longitude value");
    }

    // Weather API URL
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?${cityName ? `q=${cityName}` : `lat=${latitude}&lon=${longitude}`}&appid=${API_KEY}&units=${isCelsius ? 'metric' : 'imperial'}&lang=de`;
    
    // Log URL for debugging
    console.log("Weather URL:", weatherUrl);
    
    // Fetch weather data
    const weatherResponse = await fetch(weatherUrl);
    if (!weatherResponse.ok) {
      const error = await weatherResponse.json();
      throw new Error(`Weather API request failed: ${error.message}`);
    }
    const weatherData = await weatherResponse.json();
  
    // Forecast API URL
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?${cityName ? `q=${cityName}` : `lat=${latitude}&lon=${longitude}`}&appid=${API_KEY}&units=${isCelsius ? 'metric' : 'imperial'}&lang=de`;
    
    // Log URL for debugging
    console.log("Forecast URL:", forecastUrl);
    
    // Fetch forecast data
    const forecastResponse = await fetch(forecastUrl);
    if (!forecastResponse.ok) {
      const error = await forecastResponse.json();
      throw new Error(`Forecast API request failed: ${error.message}`);
    }
    const forecastData = await forecastResponse.json();
  
    return { weatherData, forecastData };
};
