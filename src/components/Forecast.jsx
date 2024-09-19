function Forecast({ forecast, forecastDays, isCelsius, getFilteredForecast }) {
  const filteredForecast = getFilteredForecast(forecast, forecastDays);

  const temperature = (temp) => 
    Math.round(isCelsius ? temp : temp * 9 / 5 + 32);

  return (
    <div className="forecast">
      <h3>Vorhersage für die nächsten {forecastDays} Tage</h3>
      <div className="forecast-items">
        {filteredForecast.map((day, index) => (
          <div key={index} className="forecast-item">
            <p>{day.formattedDate}</p>
            <img
              src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              alt={day.weather[0].description}
            />
            <p>
              {temperature(day.main.temp)}
              °{isCelsius ? "C" : "F"}
            </p>
            <p>{day.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;
