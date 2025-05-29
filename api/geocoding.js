// api/geocoding.js - Basic geocoding service
export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    
    // Simple geocoding placeholder
    res.json({ message: 'Geocoding service ready' });
}
