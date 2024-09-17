import { useState } from 'react';

function WeatherApp() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = '0d5f1967bbd43bfaa95a75cb5ca799cd';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setWeather(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=de`
      );
      
      if (!response.ok) {
        throw new Error('Stadt nicht gefunden');
      }

      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError('Stadt nicht Gefunden, versuche es noch einmal.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Wetter App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Gibt hier deine Stadt ein"
          style={{ padding: '10px', width: '200px' }}
        />
        <button type="submit" style={{ padding: '10px', marginLeft: '10px' }}>
          Drück mich für das Wetter
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {weather && (
        <div style={{ marginTop: '20px' }}>
          <h2>Wetter in {weather.name}</h2>
          <p>Temperatur: {weather.main.temp}°C</p>
          <p>Wetter: {weather.weather[0].description}</p>
          <p>Luftfeuchtigkeit: {weather.main.humidity}%</p>
          <p>Wind Geschwindigkeit: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
