import Modal from '../../components/Modal';
import Head from 'next/head';
import { useRouter } from 'next/router'
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from '../../styles/components/team.module.css';
import { FaInstagram, FaTiktok } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import Select from 'react-select';
import { client } from '../../lib/sanity';
import teamData from '../../public/data/team.json';

// Custom styling for react-select
const customSelectStyles = {
  control: (base) => ({
    ...base,
    backgroundColor: '#333',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '2px 4px',
    boxShadow: 'none',
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: '#333',
    borderRadius: '8px',
    zIndex: 20,
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? '#b1151e'
      : state.isFocused
      ? '#555'
      : 'transparent',
    color: 'white',
    cursor: 'pointer',
  }),
  singleValue: (base) => ({
    ...base,
    color: 'white',
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: 'white',
  }),
  input: (base) => ({
    ...base,
    color: 'white',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
};

export default function TeamPage() {
  const router = useRouter();
  const { slug } = router.query;

  // State for Sanity overrides
  const [statsOverrides, setStatsOverrides] = useState([]);
  // State for dropdown filters
  const [selectedName, setSelectedName] = useState('');
  const [selectedWeightClass, setSelectedWeightClass] = useState('');

  // Fetch overrides from Sanity (runs once on mount)
  useEffect(() => {
    client
      .fetch(`*[_type == "fighterStats"]{
        name,
        totalFights,
        record,
        accomplishments
      }`)
      .then(setStatsOverrides)
      .catch(console.error);
  }, []);

  // Merge overrides into JSON data
  const getFighterWithOverrides = (member) => {
    const override = statsOverrides.find(o => o.name === member.name);
    return {
      ...member,
      ...(override && {
        totalFights: override.totalFights ?? member.totalFights,
        record: override.record ?? member.record,
        accomplishments: override.accomplishments?.length
          ? override.accomplishments
          : member.accomplishments,
      }),
    };
  };

  const fighters = teamData.map(getFighterWithOverrides);

  // Names & weight classes for filters (from merged data)
  const names = [...new Set(fighters.map(member => member.name))].sort();
  const weightClasses = [...new Set(fighters.map(member => member.role))].sort();

  // Filtered fighters for display
  const filteredFighters = selectedName
    ? fighters.filter(member => member.name === selectedName)
    : selectedWeightClass
    ? fighters.filter(member => member.role === selectedWeightClass)
    : fighters;

  // Modal member is derived from slug and merged fighters array
  const modalMember = (() => {
    if (!slug) return null;
    const name = slug.replace(/_/g, ' ');
    return fighters.find(m => m.name === name) || null;
  })();

  const handleCardClick = (member) => {
    const slugged = member.name.replace(/ /g, '_');
    router.push(`/team/${slugged}`, undefined, { shallow: true });
  };

  const closeModal = () => {
    router.push('/team', undefined, { shallow: true });
  };

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
        <section className={styles.teamSection}>
          <h2 className={styles.sectionTitle}>Team</h2>

          {/* Filter Dropdowns */}
          <div className={styles.filterControls}>
            {/* Fighter Name Dropdown */}
            <Select
              styles={customSelectStyles}
              placeholder="All Fighters"
              options={[
                { value: '', label: 'All Fighters' },
                ...names.map(name => ({ value: name, label: name }))
              ]}
              value={
                selectedName
                  ? { value: selectedName, label: selectedName }
                  : { value: '', label: 'All Fighters' }
              }
              onChange={(selected) => {
                setSelectedName(selected.value);
                setSelectedWeightClass('');
              }}
              className={styles.reactSelect}
              classNamePrefix="rs"
            />

            {/* Weight Class Dropdown */}
            <Select
              styles={customSelectStyles}
              placeholder="All Weight Classes"
              options={[
                { value: '', label: 'All Weight Classes' },
                ...weightClasses.map(w => ({ value: w, label: w }))
              ]}
              value={
                selectedWeightClass
                  ? { value: selectedWeightClass, label: selectedWeightClass }
                  : { value: '', label: 'All Weight Classes' }
              }
              onChange={(selected) => {
                setSelectedWeightClass(selected.value);
                setSelectedName('');
              }}
              className={styles.reactSelect}
              classNamePrefix="rs"
            />
          </div>

          {/* Filtered Fighters */}
          <div className={`${styles.teamGrid} ${filteredFighters.length === 1 ? styles.centerSingle : ''}`}>
            {filteredFighters.map((member) => (
              <div
                key={member.id}
                className={styles.teamCard}
                onClick={() => handleCardClick(member)}
              >
                <div className={styles.imageWrapper}>
                  <img src={member.image || '/team/profile_placeholder_white.png'} alt={member.name} className={styles.indivImage} />
                </div>
                <h3>{member.name}</h3>
                <p className={styles.indivRole}>{member.role}</p>
                <div className={styles.socialIcons}>
                  {member.social.instagram && (
                    <a href={member.social.instagram} target="_blank" rel="noreferrer"><FaInstagram /></a>
                  )}
                  {member.social.tiktok && (
                    <a href={member.social.tiktok} target="_blank" rel="noreferrer"><FaTiktok /></a>
                  )}
                </div>
                <p className={styles.moreInfo}>Click for more info</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {modalMember && <Modal member={modalMember} onClose={closeModal} />}
      <Footer />
    </>
  );
}
