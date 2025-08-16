// pages/team/index.js
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from '../../styles/components/team.module.css';
import { FaInstagram, FaTiktok } from 'react-icons/fa';
import Select from 'react-select';
import { serverClient as sanityServer } from '../../lib/sanity';

// --- helpers ---
const slugify = (s = '') =>
  s.toString().trim().toLowerCase()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

// Lazily load the Modal component (no SSR) so it doesn't block first paint
const Modal = dynamic(() => import('../../components/Modal'), { ssr: false });

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
  // Keep your SSR, but fetch only what the grid displays to make the page light.
  res.setHeader('Cache-Control', 'no-store, max-age=0');

  const fighters = await sanityServer.fetch(`
    *[_type == "fighter_card" && !(_id in path("drafts.**"))] | order(id asc) {
      _id, id, name, role,
      // only what's needed on the grid; keep your original <img> usage
      "image": image.asset->url,
      social
    }
  `, {}, { perspective: 'published' });

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

  // Find the preview object for the modal by slug or id (lightweight)
  const modalMember = slug
    ? fighters.find(m =>
        slugify(m.name) === String(slug).toLowerCase() ||
        String(m.id) === String(slug)
      )
    : null;

  const handleCardClick = (member) => {
    const s = slugify(member.name);
    router.push(`/team/${s}`, undefined, { shallow: true, scroll: false });
  };

  const closeModal = () => router.push('/team', undefined, { shallow: true, scroll: false });

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

      <main className={styles.mainContent}>
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
                {/* Keep your original <img> handling */}
                <img
                  src={member.image || '/team/profile_placeholder_white.png'}
                  alt={member.name}
                  className={styles.indivImage}
                  loading="lazy"
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

      {/* Lazy modal: ships only when opened; it will fetch the heavy fields after mount */}
      {modalMember && <Modal member={modalMember} onClose={closeModal} />}
      <Footer />
    </>
  );
}
