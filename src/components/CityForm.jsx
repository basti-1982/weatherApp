function CityForm({ city, setCity, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} className="city-form">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Gib hier deine Stadt ein"
      />
      <button type="submit">Wetter abrufen</button>
    </form>
  );
}

export default CityForm;
