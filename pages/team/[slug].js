// pages/team/[slug].js
import TeamPage from './index';
import { serverClient as client } from '../../lib/sanity';

export default TeamPage;

export async function getServerSideProps({ res }) {
  // prevent any edge/proxy/browser caching
  res.setHeader('Cache-Control', 'no-store, max-age=0');

  const fighters = await client.fetch(
    `*[_type == "fighter_card" && !(_id in path("drafts.**"))] | order(id asc){
      id, name, role, stance, style, age, totalFights, weight, record,
      accomplishments[], bio, social,
      "image": image.asset->url,
      "gallery": gallery[].asset->url
    }`,
    {},
    { perspective: 'published' }
  );

  return { props: { fighters, _generatedAt: new Date().toISOString() } };
}
