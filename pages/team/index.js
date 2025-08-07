import Modal from '../../components/Modal';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from '../../styles/components/team.module.css';
import { FaInstagram, FaTiktok } from 'react-icons/fa';
import { useState } from 'react';
import Select from 'react-select';
import { publicClient as client } from '../../lib/sanity'

// Custom styling for react-select
const customSelectStyles = {
  control: base => ({ ...base, backgroundColor: '#333', color: 'white', border: 'none', borderRadius: 8, padding: '2px 4px', boxShadow: 'none' }),
  menu: base => ({ ...base, backgroundColor: '#333', borderRadius: 8, zIndex: 20 }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected ? '#b1151e' : state.isFocused ? '#555' : 'transparent',
    color: 'white',
    cursor: 'pointer',
  }),
  singleValue: base => ({ ...base, color: 'white' }),
  dropdownIndicator: base => ({ ...base, color: 'white' }),
  input: base => ({ ...base, color: 'white' }),
  indicatorSeparator: () => ({ display: 'none' }),
};

export async function getStaticProps() {
  // Fetch fighter cards and stats overrides from Sanity
  const fighters = await client.fetch(`
    *[_type == "fighter_card"] | order(id asc) {
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
    *[_type == "fighterStats"] {
      name,
      totalFights,
      record,
      accomplishments,
      age
    }
  `);

  return {
    props: { fighters, statsOverrides },
    revalidate: 60,
  };
}

export default function TeamPage({ fighters, statsOverrides }) {
  const router = useRouter();
  const { slug } = router.query;

  const [selectedName, setSelectedName] = useState('');
  const [selectedWeightClass, setSelectedWeightClass] = useState('');

  // Merge overrides
  const merged = fighters.map(member => {
    const override = statsOverrides.find(o => o.name === member.name);
    return override ? {
      ...member,
      totalFights: override.totalFights ?? member.totalFights,
      record: override.record ?? member.record,
      accomplishments: override.accomplishments?.length ? override.accomplishments : member.accomplishments,
      age: override.age ?? member.age,
    } : member;
  });

  const names = [...new Set(merged.map(m => m.name))].sort();
  const weightClasses = [...new Set(merged.map(m => m.role))].sort();

  const filtered = selectedName
    ? merged.filter(m => m.name === selectedName)
    : selectedWeightClass
      ? merged.filter(m => m.role === selectedWeightClass)
      : merged;

  const modalMember = slug
    ? merged.find(m => m.name.replace(/ /g, '_') === slug)
    : null;

  const handleCardClick = member => {
    const slugged = member.name.replace(/ /g, '_');
    router.push(`/team?slug=${slugged}`, undefined, { shallow: true });
  };

  const closeModal = () => router.push('/team', undefined, { shallow: true });

  return (
    <>
      <Head>
        <title>Meet Our Team | Masda Liverpool</title>
        <meta name="description" content="Team at Masda Gym Liverpool" />
      </Head>

      <Header />

      <div className={`${styles.heroWrapper} ${modalMember ? styles.blurBackground : ''}`}>
        <div className={styles.heroSection}>
          <div className={styles.heroOverlay}>
            <h1 className={styles.heroTitle}>Meet Our Team</h1>
            <p className={styles.heroSubtitle}>Train Hard. Fight Smart. Elevate</p>
          </div>
        </div>
      </div>

      <main className={`${styles.mainContent} ${modalMember ? styles.blurBackground : ''}`}>      
        <section className={styles.filterControls}>
          <Select
            styles={customSelectStyles}
            placeholder="All Fighters"
            options={[{ value: '', label: 'All Fighters' }, ...names.map(n => ({ value: n, label: n }))]}
            value={selectedName ? { value: selectedName, label: selectedName } : { value: '', label: 'All Fighters' }}
            onChange={opt => { setSelectedName(opt.value); setSelectedWeightClass(''); }}
            classNamePrefix="rs"
          />
          <Select
            styles={customSelectStyles}
            placeholder="All Weight Classes"
            options={[{ value: '', label: 'All Weight Classes' }, ...weightClasses.map(w => ({ value: w, label: w }))]}
            value={selectedWeightClass ? { value: selectedWeightClass, label: selectedWeightClass } : { value: '', label: 'All Weight Classes' }}
            onChange={opt => { setSelectedWeightClass(opt.value); setSelectedName(''); }}
            classNamePrefix="rs"
          />
        </section>

        <section className={`${styles.teamGrid} ${filtered.length === 1 ? styles.centerSingle : ''}`}>        
          {filtered.map(member => (
            <div key={member.id} className={styles.teamCard} onClick={() => handleCardClick(member)}>
              <div className={styles.imageWrapper}>
                <img src={member.image || '/team/profile_placeholder_white.png'} alt={member.name} className={styles.indivImage} />
              </div>
              <h3>{member.name}</h3>
              <p className={styles.indivRole}>{member.role}</p>
              <div className={styles.socialIcons}>
                {member.social?.instagram && <a href={member.social.instagram} target="_blank" rel="noreferrer"><FaInstagram/></a>}
                {member.social?.tiktok && <a href={member.social.tiktok} target="_blank" rel="noreferrer"><FaTiktok/></a>}
              </div>
              <p className={styles.moreInfo}>Click for more info</p>
            </div>
          ))}
        </section>
      </main>

      {modalMember && <Modal member={modalMember} onClose={closeModal} />}
      <Footer />
    </>
  );
}
