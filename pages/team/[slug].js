// pages/team/[slug].js
import TeamPage, { getStaticProps } from './index';
import { publicClient as client } from '../../lib/sanity'

export default TeamPage;
export { getStaticProps };

export async function getStaticPaths() {
  // Fetch all fighter names to generate slugs
  const fighters = await client.fetch(`*[_type == "fighter_card"]{name}`);
  const paths = fighters.map(f => ({
    params: { slug: f.name.replace(/ /g, '_') }
  }));
  return {
    paths,
    fallback: 'blocking', // or true / 'blocking' depending on your preference
  };
}
