function Forecast({ forecast, forecastDays, isCelsius, getFilteredForecast }) {
  return (
    <div className="forecast">
      <h3>Vorhersage für die nächsten {forecastDays} Tage</h3>
      <div className="forecast-items">
        {getFilteredForecast(forecast, forecastDays).map((day, index) => (
          <div key={index} className="forecast-item">
            <p>{day.formattedDate}</p>
            <img
              src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              alt={day.weather[0].description}
            />
            <p>
              {day.main.temp}°{isCelsius ? "C" : "F"}
            </p>
            <p>{day.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;
