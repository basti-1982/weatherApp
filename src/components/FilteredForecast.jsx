export const getFilteredForecast = (forecast, forecastDays) => {
    if (!forecast || !Array.isArray(forecast.list)) return [];
  
    const now = Date.now();
    const forecastDaysInHours = forecastDays * 24;
    const cutoffTime = now + forecastDaysInHours * 60 * 60 * 1000;
  
    // Filtere Einträge, die innerhalb des Vorhersagezeitraums liegen
    const filteredEntries = forecast.list.filter(entry => {
      const entryTime = entry.dt * 1000; // Konvertiere von Sekunden in Millisekunden
      return entryTime <= cutoffTime && entryTime >= now;
    });
  
    // Aggregiere Einträge nach Datum
    const dailyForecast = Array.from(
      filteredEntries.reduce((days, entry) => {
        const date = new Date(entry.dt * 1000).toDateString();
        if (!days.has(date)) {
          days.set(date, entry);
        }
        return days;
      }, new Map())
    ).slice(0, forecastDays);
  
    return dailyForecast.map(day => ({
      ...day[1], // Verwende den Wert aus der Map (das ist das Eintragsobjekt)
      formattedDate: new Date(day[1].dt * 1000).toLocaleDateString('de-DE', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    }));
  };
  