// pages/api/revalidate.js
export default async function handler(req, res) {
  try {
    if (req.query.secret !== process.env.REVALIDATE_SECRET) {
      return res.status(401).json({ message: 'Invalid secret' });
    }
    const path = req.query.path || '/team';
    await res.revalidate(path);
    return res.json({ revalidated: true, path });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
