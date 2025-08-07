// pages/api/revalidate.js
export default async function handler(req, res) {
  try {
    const { secret, path } = req.query;
    if (secret !== process.env.REVALIDATE_SECRET) {
      return res.status(401).json({ message: 'Invalid secret' });
    }

    const paths = new Set();

    // Always refresh the team index (with and without trailing slash)
    paths.add('/team');
    paths.add('/team/');

    // Try to refresh the changed fighter's slug page from payload (name -> underscores)
    const body = req.body || {};
    const mutation = body?.mutations?.[0];
    const doc = mutation?.document || body;
    const changedName =
      doc?.name ||
      mutation?.patch?.set?.name ||
      mutation?.create?.name ||
      null;

    if (typeof changedName === 'string') {
      const slug = changedName.replace(/ /g, '_');
      paths.add(`/team/${slug}`);
      paths.add(`/team/${slug}/`);
    }

    // Allow manual: ?path=/team&path=/team/Foo_Bar
    const extra = Array.isArray(path) ? path : path ? [path] : [];
    extra.forEach(p => paths.add(p));

    const done = [];
    for (const p of paths) {
      await res.revalidate(p);
      done.push(p);
      console.log('[revalidate]', p, new Date().toISOString());
    }

    return res.status(200).json({ revalidated: true, paths: done });
  } catch (err) {
    console.error('[revalidate] error:', err);
    return res.status(500).json({ message: err.message });
  }
}
