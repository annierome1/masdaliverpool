// pages/api/debug-sanity.js
import { serverClient } from '../../lib/sanity';

export default async function handler(req, res) {
  const { name } = req.query; // ?name=Fighter%20Name

  let query = `*[_type=="fighter_card" && !(_id in path("drafts.**"))]{
    _id,_updatedAt,name,record
  } | order(name asc)`;

  let params = {};

  if (name) {
    query = `*[_type=="fighter_card" && !(_id in path("drafts.**")) && name == $name]{
      _id,_updatedAt,name,record
    } | order(name asc)`;
    params = { name };
  }

  const rows = await serverClient.fetch(query, params);

  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json({
    ts: new Date().toISOString(),
    count: rows.length,
    results: rows,
  });
}
