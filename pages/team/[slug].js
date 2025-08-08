// pages/team/[slug].js
import TeamPage from './index';
import { serverClient as client } from '../../lib/sanity';

export default TeamPage;

// ✅ Always fetch fresh slug data directly from Sanity
export async function getServerSideProps(context) {
  const { slug } = context.params;
  const fighterName = slug.replace(/_/g, ' ');

  const fighters = await client.fetch(`
    *[_type == "fighter_card" && !(_id in path("drafts.**"))] | order(id asc) {
      id,
      name,
      role,
      stance,
      style,
      age,
      totalFights,
      weight,
      record,
      accomplishments[],
      bio,
      social,
      "image": image.asset->url,
      "gallery": gallery[].asset->url
    }
  `);

  const statsOverrides = await client.fetch(`
    *[_type == "fighterStats" && !(_id in path("drafts.**"))]{
      name,
      totalFights,
      record,
      accomplishments,
      age
    }
  `);

  const hasNonEmpty = v => typeof v === 'string' && v.trim() !== '';
  const hasArray = a => Array.isArray(a) && a.length > 0;

  const merged = fighters.map(member => {
    const override = statsOverrides.find(o => o.name === member.name);
    if (!override) return member;

    return {
      ...member,
      totalFights:
        typeof override.totalFights === 'number' ? override.totalFights : member.totalFights,
      record: hasNonEmpty(override.record) ? override.record.trim() : member.record,
      accomplishments: hasArray(override.accomplishments)
        ? override.accomplishments
        : member.accomplishments,
      age: typeof override.age === 'number' ? override.age : member.age,
    };
  });

  return {
    props: {
      fighters: merged,
      _generatedAt: new Date().toISOString(),
    }
  };
}
