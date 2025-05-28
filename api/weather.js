export default async function handler(req, res) {
  const { lat, lon } = req.query;
  
  // For testing without API key
  if (!process.env.OPENWEATHER_API_KEY) {
    return res.status(200).json({
      main: { temp: 72, humidity: 65 },
      wind: { speed: 10, deg: 180 },
      weather: [{ main: 'Clear' }]
    });
  }
  
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}&units=imperial`
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Weather API error' });
  }
}
