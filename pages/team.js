// pages/team.js
import Modal from '../components/Modal';
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import styles from '../styles/components/team.module.css'
import {  FaFacebookF,  FaInstagram,  FaTwitter} from 'react-icons/fa'
import { useState } from 'react';
// import your JSON data
import teamData from '../public/data/team.json'

export default function TeamPage() {
  const [ selectedMember, setSelectedMember ] = useState(null);

  const handleCardClick = (member) => {
    setSelectedMember(member);
  };

  const closeModal = () => {
    setSelectedMember(null);
  };

  return (
    <>
      <Head>
        <title>Meet Our Team | Masda Liverpool</title>
        <meta
          name="description"
          content="Team at Masda Gym Liverpool"
        />
      </Head>

      <Header />

      {/* Hero Section */}
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
          <div className={styles.teamGrid}>
            {teamData.map((member) => (
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

