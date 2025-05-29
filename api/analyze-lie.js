// api/analyze-lie.js
export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    try {
        // For now, simulate AI analysis
        // In production, you'd process the uploaded image here
        
        const lies = [
            { type: 'fairway', penalty: 0, name: 'Fairway', confidence: 95 
},
            { type: 'first_cut', penalty: -3, name: 'First Cut', 
confidence: 88 },
            { type: 'rough', penalty: -8, name: 'Primary Rough', 
confidence: 92 },
            { type: 'heavy_rough', penalty: -15, name: 'Heavy Rough', 
confidence: 85 },
            { type: 'bunker', penalty: -12, name: 'Greenside Bunker', 
confidence: 97 }
        ];
        
        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const result = lies[Math.floor(Math.random() * lies.length)];
        res.json(result);
        
    } catch (error) {
        console.error('Lie analysis error:', error);
        res.status(500).json({ error: 'Analysis failed' });
    }
}
