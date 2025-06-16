export default async function handler(req, res) {
  const token = process.env.INSTA_LONG_LIVED_TOKEN;
  const fields = [
    'id',
    'caption',
    'media_url',
    'permalink',
    'thumbnail_url',
    'media_type',
    'timestamp'      // Add timestamp!
  ].join(',');
  const url = `https://graph.instagram.com/me/media?fields=${fields}&access_token=${token}&limit=25`;

  const igRes = await fetch(url);
  if (!igRes.ok) {
    return res.status(igRes.status).json({ error: 'Instagram fetch failed' });
  }
  const json = await igRes.json();

  // Sort by most recent
  const posts = json.data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  res.status(200).json(posts.slice(0, 15));
}
