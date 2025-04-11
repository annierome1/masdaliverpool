import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/components/gym.module.css';

export default function TheGymPage() {
  return (
    <>
      <Head>
        <title>The Gym | Masda Liverpool</title>
        <meta
          name="description"
          content="Explore our state-of-the-art facility designed for fighters of all levels."
        />
      </Head>

      <Header />

      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div className={styles.heroOverlay}>
          <h1 className={styles.heroTitle}>Welcome to Our World-Class Facility</h1>
          <p className={styles.heroSubtitle}>
            Experience training in a state-of-the-art facility designed for fighters of all levels.
          </p>
          <a href="/classes" className={styles.heroButton}>Start Your Journey</a>
        </div>
      </div>

      <main className={styles.mainContent}>
        {/* Facility Section */}
        <section className={styles.facilitySection}>
          <h2>Our World-Class Facility</h2>
          <div className={styles.facilityGrid}>
            {/* Card 1 */}
            <div className={styles.facilityCard}>
              <img
                src="/thegym/spacious-arena.jpg"
                alt="Spacious Arena"
                className={styles.cardImage}
              />
              <h3>Spacious Arena</h3>
              <p>
                Ample space to train, spar, and hone your skills.
              </p>
            </div>

            {/* Card 2 */}
            <div className={styles.facilityCard}>
              <img
                src="/thegym/modern-amenities.jpg"
                alt="Modern Amenities"
                className={styles.cardImage}
              />
              <h3>Modern Amenities</h3>
              <p>
                Fully equipped locker rooms, showers, and relaxation areas.
              </p>
            </div>

            {/* Card 3 */}
            <div className={styles.facilityCard}>
              <img
                src="/thegym/clinic.png"
                alt="Concordia Clinic"
                className={styles.cardImage}
              />
              <h3>Therapy Clinic & Recover Center</h3>
              <p>
              The Clinic aims to help and guide those looking for better health and wellbeing, and we have a broad range of treatment options to assist in most conditions.
              </p>
            </div>
          </div>
        </section>

        {/* Equipment Section */}
        <section className={styles.equipmentSection}>
          <h2>Our Equipment</h2>
          <div className={styles.equipmentGrid}>
            {/* Card 1 */}
            <div className={styles.equipmentCard}>
              <img
                src="/thegym/professional-ring.jpg"
                alt="Professional Ring"
                className={styles.cardImage}
              />
              <h3>Professional Ring</h3>
            </div>

            {/* Card 2 */}
            <div className={styles.equipmentCard}>
              <img
                src="/thegym/heavy-bags.jpg"
                alt="Heavy Bags"
                className={styles.cardImage}
              />
              <h3>Heavy Bags</h3>
            </div>

            {/* Card 3 */}
            <div className={styles.equipmentCard}>
              <img
                src="/thegym/full-size-cage.jpg"
                alt="Full-Size Cage"
                className={styles.cardImage}
              />
              <h3>Full-Size Cage</h3>
            </div>

            {/* Card 4 */}
            <div className={styles.equipmentCard}>
              <img
                src="/thegym/pad-station.jpg"
                alt="Pad Station"
                className={styles.cardImage}
              />
              <h3>Pad Station</h3>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className={styles.ctaSection}>
          <h2>Ready to Start Training?</h2>
          <p>
            Join our community of fighters and start your journey today.
          </p>
          <div className={styles.ctaButtons}>
            <a href="/classes" className={styles.ctaButton}>View Membership Plans</a>
            <a href="/contact" className={styles.ctaButton}>Book a Session</a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
