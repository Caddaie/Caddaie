// api/weather.js
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    
    const { lat, lon } = req.query;
    
    if (!lat || !lon) {
        return res.status(400).json({ error: 'Latitude and longitude 
required' });
    }
    
    try {
        const response = await fetch(
            
`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=imperial`
        );
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Weather API error');
        }
        
        res.json(data);
    } catch (error) {
        console.error('Weather API error:', error);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
}
