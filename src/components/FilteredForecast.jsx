export const getFilteredForecast = (forecast, forecastDays) => {
    if (!forecast || !forecast.list) return [];

    const forecastDaysInHours = forecastDays * 24;
    const filteredForecast = forecast.list.filter((entry) => {
        const entryTime = entry.dt * 1000;
        const now = new Date().getTime();
        return entryTime >= now && entryTime <= now + forecastDaysInHours * 60 * 60 * 1000;
    });

    const dailyForecast = [];
    const daysSet = new Set();

    filteredForecast.forEach((entry) => {
        const entryDate = new Date(entry.dt * 1000).toDateString();
        if (!daysSet.has(entryDate)) {
            daysSet.add(entryDate);
            dailyForecast.push(entry);
        }
    });

    return dailyForecast.slice(0, forecastDays).map((day) => {
        return {
            ...day,
            formattedDate: new Date(day.dt * 1000).toLocaleDateString('de-DE', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            }),
        };
    });
};
