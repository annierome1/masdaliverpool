// pages/team.js
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import styles from '../styles/components/team.module.css'
import {  FaFacebookF,  FaInstagram,  FaTwitter} from 'react-icons/fa'
// import your JSON data
import teamData from '../public/data/team.json'

export default function TeamPage() {
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
      <div className={styles.heroWrapper}>
        <div className={styles.heroSection}>
          <div className={styles.heroOverlay}>
            <h1 className={styles.heroTitle}>Meet Our Team</h1>
            <p className={styles.heroSubtitle}>One Team, One Family</p>
          </div>
        </div>
      </div>

\<main className={styles.mainContent}>
  {/* Team Grid */}
  <section className={styles.teamSection}>
    <h2 className={styles.sectionTitle}>Team</h2>
    <div className={styles.teamGrid}>
      {teamData.map((member) => (
        <div key={member.id} className={styles.teamCard}>
          {/* ← image wrapper */}
          <div className={styles.imageWrapper}>
            <img
              src={member.image}
              alt={member.name}
              className={styles.indivImage}
            />
          </div>

          <h3>{member.name}</h3>
          <p className={styles.indivRole}>{member.role}</p>
          <p className={styles.indivBio}>{member.bio}</p>

                {/* Social icons */}
                <div className={styles.socialIcons}>
                  {member.social.facebook && (
                    <a
                      href={member.social.facebook}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Facebook"
                    >
                      <FaFacebookF />
                    </a>
                  )}
                  {member.social.instagram && (
                    <a
                      href={member.social.instagram}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Instagram"
                    >
                      <FaInstagram />
                    </a>
                  )}
                  {member.social.twitter && (
                    <a
                      href={member.social.twitter}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Twitter"
                    >
                      <FaTwitter />
                    </a>
                  )}
                </div>
        </div>
      ))}
    </div>
  </section>
</main>


      <Footer />
    </>
  )
}
