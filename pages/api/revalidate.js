// pages/api/revalidate.js
export default async function handler(req, res) {
  try {
    const { secret, path } = req.query;
    if (secret !== process.env.REVALIDATE_SECRET) {
      return res.status(401).json({ message: 'Invalid secret' });
    }

    // Sanity sends payload as JSON. Try to get the doc.
    const body = req.body || {};
    const mutation = body?.mutations?.[0];
    const doc = mutation?.document || body; // be defensive

    const pathsToRevalidate = new Set();

    // Always refresh team index
    pathsToRevalidate.add('/team');

    // If the changed doc looks like a fighter, refresh its slug page too
    const name =
      doc?.name ||
      mutation?.patch?.set?.name ||
      mutation?.create?.name ||
      null;

    // replicate your slug logic (space -> underscore)
    const slugFromName = (n) => (typeof n === 'string' ? n.replace(/ /g, '_') : null);
    const fighterSlug = slugFromName(name);
    if (fighterSlug) {
      pathsToRevalidate.add(`/team/${fighterSlug}`);
    }

    // Allow manual override: /api/revalidate?secret=...&path=/foo&path=/bar
    if (path) {
      const arr = Array.isArray(path) ? path : [path];
      arr.forEach((p) => pathsToRevalidate.add(p));
    }

    for (const p of pathsToRevalidate) {
      await res.revalidate(p);
      console.log('[revalidate]', p, new Date().toISOString());
    }

    return res.status(200).json({ revalidated: true, paths: [...pathsToRevalidate] });
  } catch (err) {
    console.error('[revalidate] error:', err);
    return res.status(500).json({ message: err.message });
  }
}
