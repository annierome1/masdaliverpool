// pages/api/revalidate.js
// Trigger ISR revalidation for /team.
// Call with: Authorization: Bearer <REVALIDATE_SECRET>
export default async function handler(req, res) {
  const authHeader = req.headers['authorization'] || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';

  if (!token || token !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ message: 'Invalid secret' });
  }

  try {
    await res.revalidate('/team');
    return res.json({ revalidated: true, path: '/team' });
  } catch (err) {
    return res.status(500).send('Error revalidating');
  }
}
