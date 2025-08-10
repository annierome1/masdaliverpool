// pages/team/index.js
import Modal from '../../components/Modal';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from '../../styles/components/team.module.css';
import { FaInstagram, FaTiktok } from 'react-icons/fa';
import { useState } from 'react';
import Select from 'react-select';
import { serverClient } from '../../lib/sanity';

// --- helpers ---
const slugify = (s = '') =>
  s.toString().trim().toLowerCase()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const customSelectStyles = {
  control: base => ({ ...base, backgroundColor: '#333', color: 'white', border: 'none', borderRadius: 8, padding: '2px 4px', boxShadow: 'none' }),
  menu: base => ({ ...base, backgroundColor: '#333', borderRadius: 8, zIndex: 20 }),
  option: (base, state) => ({ ...base, backgroundColor: state.isSelected ? '#b1151e' : state.isFocused ? '#555' : 'transparent', color: 'white', cursor: 'pointer' }),
  singleValue: base => ({ ...base, color: 'white' }),
  dropdownIndicator: base => ({ ...base, color: 'white' }),
  input: base => ({ ...base, color: 'white' }),
  indicatorSeparator: () => ({ display: 'none' }),
};

export async function getServerSideProps({ res }) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');

  const fighters = await serverClient.fetch(`
    *[_type == "fighter_card" && !(_id in path("drafts.**"))] | order(id asc) {
      id, name, role, stance, style, age, totalFights, weight, record,
      accomplishments[], bio, social,
      "image": image.asset->url,
      "gallery": gallery[].asset->url
    }
  `);

  return { props: { fighters, _generatedAt: new Date().toISOString() } };
}

export default function TeamPage({ fighters }) {
  const router = useRouter();
  const { slug } = router.query;

  const [selectedName, setSelectedName] = useState('');
  const [selectedWeightClass, setSelectedWeightClass] = useState('');

  const names = [...new Set(fighters.map(m => m.name))].sort();
  const weightClasses = [...new Set(fighters.map(m => m.role))].sort();

  const filtered = selectedName
    ? fighters.filter(m => m.name === selectedName)
    : selectedWeightClass
    ? fighters.filter(m => m.role === selectedWeightClass)
    : fighters;

  // Find modal member by name slug (fallback to id for old links)
  const modalMember = slug
    ? fighters.find(m =>
        slugify(m.name) === String(slug).toLowerCase() ||
        String(m.id) === String(slug)
      )
    : null;

  const handleCardClick = (member) => {
    const s = slugify(member.name);
    router.push(`/team/${s}`, undefined, { shallow: true });
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
            <div key={slugify(member.name)} className={styles.teamCard} onClick={() => handleCardClick(member)}>
              <div className={styles.imageWrapper}>
                <img
                  src={member.image || '/team/profile_placeholder_white.png'}
                  alt={member.name}
                  className={styles.indivImage}
                />
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
