import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/components/team.module.css';

export default function TeamPage() {
  return (
    <>
      

      <Header />

      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div className={styles.heroOverlay}>
            <h1 className={styles.heroTitle}>Meet Our Team</h1>
            <p className={styles.heroSubtitle}>One Team, One Family</p>
        </div>
        </div>


      <main className={styles.mainContent}>
        {/* Team Grid */}
        <section className={styles.teamSection}>
          <h2 className={styles.sectionTitle}>Team</h2>
          <div className={styles.teamGrid}>
            {/* Coach 1 */}
            <div className={styles.teamCard}>
              <img
                src="/team/alfie.jpg"
                alt="Alfie"
                className={styles.coachImage}
              />
              <h3>Name</h3>
              <p className={styles.coachRole}>Fighter</p>
              <p className={styles.coachBio}>
                Description
              </p>
            </div>

            {/* Coach 2 */}
            <div className={styles.teamCard}>
              <img
                src="/team/sarah-martinez.jpg"
                alt="Sarah Martinez"
                className={styles.coachImage}
              />
              <h3>Name</h3>
              <p className={styles.coachRole}>...</p>
              <p className={styles.coachBio}>
                Description
              </p>
            </div>

            {/* Coach 3 */}
            <div className={styles.teamCard}>
              <img
                src="/team/alex-chen.jpg"
                alt="Alex 'The Thunder' Chen"
                className={styles.coachImage}
              />
              <h3>Name</h3>
              <p className={styles.coachRole}>...</p>
              <p className={styles.coachBio}>
                Description
              </p>
            </div>

            {/* Coach 4 */}
            <div className={styles.teamCard}>
              <img
                src="/team/dave-johnson.jpg"
                alt="Dave Johnson"
                className={styles.coachImage}
              />
              <h3>Name</h3>
              <p className={styles.coachRole}>...</p>
              <p className={styles.coachBio}>
                Description
              </p>
            </div>

            {/* Coach 5 */}
            <div className={styles.teamCard}>
              <img
                src="/team/emily-parker.jpg"
                alt="Emily Parker"
                className={styles.coachImage}
              />
              <h3>Name</h3>
              <p className={styles.coachRole}>...</p>
              <p className={styles.coachBio}>
                Description
              </p>
            </div>

            {/* Coach 6 */}
            <div className={styles.teamCard}>
              <img
                src="/team/robert-wilson.jpg"
                alt="Robert 'Iron Fists' Wilson"
                className={styles.coachImage}
              />
              <h3>Name</h3>
              <p className={styles.coachRole}>...</p>
              <p className={styles.coachBio}>
                Description
              </p>
            </div>
          </div>
        </section>


      </main>

      <Footer />
    </>
  );
}
