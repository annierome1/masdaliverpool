export default async function handler(req, res) {
  const token = process.env.INSTA_LONG_LIVED_TOKEN;
  
  // Check if token exists
  if (!token || token === 'your_instagram_long_lived_token_here') {
    return res.status(500).json({ 
      error: 'Instagram API not configured',
      message: 'Please set up your Instagram Long-Lived Access Token in .env.local'
    });
  }

  const fields = [
    'id',
    'caption',
    'media_url',
    'permalink',
    'thumbnail_url',
    'media_type',
    'timestamp'
  ].join(',');
  
  const url = `https://graph.instagram.com/me/media?fields=${fields}&access_token=${token}&limit=25`;

  try {
    const igRes = await fetch(url);
    
    if (!igRes.ok) {
      const errorData = await igRes.json().catch(() => ({}));
      
      return res.status(igRes.status).json({ 
        error: 'Instagram API error',
        status: igRes.status,
        details: errorData
      });
    }
    
    const json = await igRes.json();
    
    if (!json.data || !Array.isArray(json.data)) {
      return res.status(500).json({ 
        error: 'Invalid Instagram API response',
        data: json
      });
    }

    // Sort by most recent
    const posts = json.data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    res.status(200).json(posts.slice(0, 15));
    
  } catch (error) {
    return res.status(500).json({ 
      error: 'Failed to fetch Instagram feed',
      message: error.message
    });
  }
}
