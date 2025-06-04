import Modal from '../components/Modal';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/components/team.module.css';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import { useState } from 'react';
import Select from 'react-select';
// import your JSON data
import teamData from '../public/data/team.json';

const names = [...new Set(teamData.map(member => member.name))].sort();
const weightClasses = [...new Set(teamData.map(member => member.role))].sort();

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
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedName, setSelectedName] = useState('');
  const [selectedWeightClass, setSelectedWeightClass] = useState('');

  const handleCardClick = (member) => {
    setSelectedMember(member);
  };

  const closeModal = () => {
    setSelectedMember(null);
  };

  const filteredFighters = selectedName
    ? teamData.filter(member => member.name === selectedName)
    : selectedWeightClass
    ? teamData.filter(member => member.role === selectedWeightClass)
    : teamData;

  return (
    <>
      <Head>
        <title>Meet Our Team | Masda Liverpool</title>
        <meta name="description" content="Team at Masda Gym Liverpool" />
      </Head>

      <Header />

      <div className={`${styles.heroWrapper} ${selectedMember ? styles.blurBackground : ''}`}>
        <div className={styles.heroSection}>
          <div className={styles.heroOverlay}>
            <h1 className={styles.heroTitle}>Meet Our Team</h1>
            <p className={styles.heroSubtitle}>One Team, One Family</p>
          </div>
        </div>
      </div>

      <main className={`${styles.mainContent} ${selectedMember ? styles.blurBackground : ''}`}>
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
                  <img src={member.image} alt={member.name} className={styles.indivImage} />
                </div>
                <h3>{member.name}</h3>
                <p className={styles.indivRole}>{member.role}</p>
                <div className={styles.socialIcons}>
                  {member.social.facebook && (
                    <a href={member.social.facebook} target="_blank" rel="noreferrer"><FaFacebookF /></a>
                  )}
                  {member.social.instagram && (
                    <a href={member.social.instagram} target="_blank" rel="noreferrer"><FaInstagram /></a>
                  )}
                  {member.social.twitter && (
                    <a href={member.social.twitter} target="_blank" rel="noreferrer"><FaTwitter /></a>
                  )}
                </div>
                <p className={styles.moreInfo}>Click for more info</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {selectedMember && <Modal member={selectedMember} onClose={closeModal} />}
      <Footer />
    </>
  );
}
