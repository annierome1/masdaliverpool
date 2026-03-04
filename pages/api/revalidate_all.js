// pages/api/revalidate_all.js
// Trigger ISR revalidation for /team and all fighter pages.
// Call with: Authorization: Bearer <REVALIDATE_SECRET>
export default async function handler(req, res) {
  const authHeader = req.headers['authorization'] || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';

  if (!token || token !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ message: 'Invalid secret' });
  }

  try {
    const { serverClient: client } = await import('../../lib/sanity');

    const fighters = await client.fetch(`
      *[_type == "fighter_card" && !(_id in path("drafts.**"))]{ name }
    `);

    const slugs = fighters.map(f => f.name.replace(/ /g, '_'));

    await res.revalidate('/team');

    for (const slug of slugs) {
      await res.revalidate(`/team/${slug}`);
    }

    return res.json({
      revalidated: true,
      pages: ['/team', ...slugs.map(slug => `/team/${slug}`)],
    });
  } catch (err) {
    return res.status(500).send('Error revalidating');
  }
}
