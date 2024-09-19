  import { API_KEY } from "../config";

  export const fetchWeatherData = async ({ latitude, longitude, cityName, isCelsius }) => {
    let url;
    if (latitude && longitude) {
      // Wenn Koordinaten vorhanden, verwenden wir diese
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=${isCelsius ? 'metric' : 'imperial'}&lang=de`;
    } else if (cityName) {
      // Nur wenn Stadtname und keine Koordinaten vorhanden
      url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=${isCelsius ? 'metric' : 'imperial'}&lang=de`;
    } else {
      throw new Error('Bitte geben Sie entweder Stadtname oder Koordinaten an.');
    }
  
    const weatherResponse = await fetch(url);
    if (!weatherResponse.ok) {
      throw new Error(`Wetter-API-Anfrage fehlgeschlagen mit Status ${weatherResponse.status}`);
    }
    const weatherData = await weatherResponse.json();
  
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?${latitude && longitude ? `lat=${latitude}&lon=${longitude}` : `q=${cityName}`}&appid=${API_KEY}&units=${isCelsius ? 'metric' : 'imperial'}&lang=de`;
  
    const forecastResponse = await fetch(forecastUrl);
    if (!forecastResponse.ok) {
      throw new Error(`Vorhersage-API-Anfrage fehlgeschlagen mit Status ${forecastResponse.status}`);
    }
    const forecastData = await forecastResponse.json();
  
    return { weatherData, forecastData };
  };
  