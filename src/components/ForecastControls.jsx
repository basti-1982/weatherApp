function ForecastControls({ forecastDays, handleForecastChange }) {
    return (
      <div className="forecast-controls">
        <label htmlFor="forecastDays">Vorhersage für:</label>
        <select
          id="forecastDays"
          value={forecastDays}
          onChange={handleForecastChange}>
          <option value="">Bitte wählen</option>
          <option value={3}>3 Tage</option>
          <option value={5}>5 Tage</option>
        </select>
      </div>
    );
  }
  
  export default ForecastControls;