/// api/weather.js - Enhanced version
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    const { lat, lon } = req.query;
    
    if (!lat || !lon) {
        return res.status(400).json({ error: 'Latitude and longitude required' });
    }
    
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=imperial`
        );
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Weather API error');
        }
        
        const enhancedData = {
            ...data,
            wind: {
                speed: data.wind?.speed || 5,
                deg: data.wind?.deg || 180,
                gust: data.wind?.gust || data.wind?.speed || 5
            },
            main: {
                ...data.main,
                feels_like: data.main.feels_like,
                humidity: data.main.humidity || 60,
                pressure: data.main.pressure || 1013
            }
        };
        
        res.json(enhancedData);
    } catch (error) {
        console.error('Weather API error:', error);
        res.status(500).json({ 
            error: 'Failed to fetch weather data',
            fallback: {
                main: { temp: 70, humidity: 60, feels_like: 72 },
                wind: { speed: 5, deg: 180, gust: 8 }
            }
        });
    }
}/ api/weather.js
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
