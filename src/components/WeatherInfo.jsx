function WeatherInfo({ weather, isCelsius, getLocalTime }) {
  return (
    <div className="weather-info">
      <h2 className="weather-title">Wetter in {weather.name}</h2>
      <p>
        Temperatur: {weather.main.temp}°{isCelsius ? "C" : "F"}
      </p>
      <p>Wetter: {weather.weather[0].description}</p>
      <p>Luftfeuchtigkeit: {weather.main.humidity}%</p>
      <p>
        Windgeschwindigkeit: {weather.wind.speed}{" "}
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
