function WeatherInfo({ weather, isCelsius, getLocalTime }) {
  if (!weather || !weather.main || !weather.weather || !weather.wind) {
    return <div>No weather data available</div>;
  }

  const temperature = Math.round(isCelsius 
    ? weather.main.temp 
    : weather.main.temp * 9 / 5 + 32);

  const windSpeed = Math.round(isCelsius ? weather.wind.speed : weather.wind.speed * 2.23694);

  return (
    <div className="weather-info">
      <h2 className="weather-title">Wetter in {weather.name}</h2>
      <p>
        Temperatur: {temperature}°{isCelsius ? "C" : "F"}
      </p>
      <p>Wetter: {weather.weather[0].description}</p>
      <p>Luftfeuchtigkeit: {weather.main.humidity}%</p>
      <p>
        Windgeschwindigkeit: {windSpeed}{" "}
        {isCelsius ? "m/s" : "miles/h"}
      </p>
      <img
        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}
      />
      <p>Lokale Zeit: {getLocalTime(weather.timezone)}</p>
    </div>
  );
}

export default WeatherInfo;
