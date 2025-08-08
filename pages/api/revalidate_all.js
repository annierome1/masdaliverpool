// pages/api/revalidate-all.js
export default async function handler(req, res) {
  if (req.query.secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ message: 'Invalid secret' });
  }

  try {
    // Import Sanity client on demand
    const { serverClient: client } = await import('../../lib/sanity');

    // Fetch all fighter names from Sanity
    const fighters = await client.fetch(`
      *[_type == "fighter_card" && !(_id in path("drafts.**"))]{ name }
    `);

    // Convert names to slug format (underscores instead of spaces)
    const slugs = fighters.map(f =>
      f.name.replace(/ /g, '_')
    );

    // Always revalidate the main team page
    await res.revalidate('/team');

    // Revalidate each fighter page
    for (const slug of slugs) {
      await res.revalidate(`/team/${slug}`);
    }

    return res.json({
      revalidated: true,
      pages: ['/team', ...slugs.map(slug => `/team/${slug}`)]
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send('Error revalidating');
  }
}
