// pages/api/instagram.js
export default async function handler(req, res) {
  const token = process.env.INSTA_LONG_LIVED_TOKEN;
  const fields = [
    'id',
    'caption',
    'media_url',
    'permalink',
    'thumbnail_url',
    'media_type'
  ].join(',');
  const url = `https://graph.instagram.com/me/media?fields=${fields}&access_token=${token}`;

  const igRes = await fetch(url);
  if (!igRes.ok) {
    return res.status(igRes.status).json({ error: 'Instagram fetch failed' });
  }
  const json = await igRes.json();
  // Take first 8 posts (or whatever)
  res.status(200).json(json.data.slice(0, 10));
}
