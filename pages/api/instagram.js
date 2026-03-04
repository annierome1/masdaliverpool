export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end()

  if (!process.env.INSTAGRAM_FEED_API_URL || !process.env.INSTAGRAM_FEED_API_KEY) {
    return res.status(500).json({ ok: false, error: 'Instagram feed not configured' })
  }

  try {
    const upstream = await fetch(process.env.INSTAGRAM_FEED_API_URL, {
      headers: {
        Authorization: `Bearer ${process.env.INSTAGRAM_FEED_API_KEY}`,
      },
    })

    const data = await upstream.json()
    res.setHeader('Cache-Control', 'public, max-age=1800, s-maxage=1800')
    return res.status(upstream.status).json(data)
  } catch (err) {
    return res.status(500).json({ ok: false, error: 'Failed to fetch Instagram feed' })
  }
}
