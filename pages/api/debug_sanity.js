// pages/api/debug-sanity.js
import { serverClient } from '../../lib/sanity';
export default async function handler(req, res) {
  const data = await serverClient.fetch(`*[_type=="fighter_card"]{_id,_updatedAt,name,record} | order(name asc)`);
  res.setHeader('Cache-Control','no-store');
  res.json({ count: data.length, latest: data.slice(0,5) });
}
