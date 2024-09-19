export default function Header({ toggleDarkMode, toggleTemperatureUnit, isDarkMode, isCelsius }) {
  return (
    <header className="header">
      <h1>Ihre Vorhersagen sicher und zuverlässig</h1>
      <div className="header-buttons">
        <button onClick={toggleDarkMode}>
          {isDarkMode ? 'Licht AN' : 'Licht AUS'}
        </button>
        <button onClick={toggleTemperatureUnit}>
          {isCelsius ? 'Wechsel zu Fahrenheit' : 'Wechsel zu Celsius'}
        </button>
      </div>
    </header>
  );
}
