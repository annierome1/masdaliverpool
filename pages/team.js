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
              <h3>Alfie</h3>
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
              <h3>Sarah Martinez</h3>
              <p className={styles.coachRole}>BJJ Head Coach</p>
              <p className={styles.coachBio}>
                Our first female black belt, Sarah has medaled in international BJJ tournaments.
              </p>
            </div>

            {/* Coach 3 */}
            <div className={styles.teamCard}>
              <img
                src="/team/alex-chen.jpg"
                alt="Alex 'The Thunder' Chen"
                className={styles.coachImage}
              />
              <h3>Alex “The Thunder” Chen</h3>
              <p className={styles.coachRole}>Striking Coach</p>
              <p className={styles.coachBio}>
                Renowned for his lightning-fast Muay Thai, Alex coaches advanced striking techniques.
              </p>
            </div>

            {/* Coach 4 */}
            <div className={styles.teamCard}>
              <img
                src="/team/dave-johnson.jpg"
                alt="Dave Johnson"
                className={styles.coachImage}
              />
              <h3>Dave Johnson</h3>
              <p className={styles.coachRole}>Wrestling Coach</p>
              <p className={styles.coachBio}>
                A former NCAA champion, Dave refines takedowns and ground control for all levels.
              </p>
            </div>

            {/* Coach 5 */}
            <div className={styles.teamCard}>
              <img
                src="/team/emily-parker.jpg"
                alt="Emily Parker"
                className={styles.coachImage}
              />
              <h3>Emily Parker</h3>
              <p className={styles.coachRole}>Strength &amp; Conditioning</p>
              <p className={styles.coachBio}>
                Specializing in functional fitness, Emily helps fighters improve power and endurance.
              </p>
            </div>

            {/* Coach 6 */}
            <div className={styles.teamCard}>
              <img
                src="/team/robert-wilson.jpg"
                alt="Robert 'Iron Fists' Wilson"
                className={styles.coachImage}
              />
              <h3>Robert “Iron Fists” Wilson</h3>
              <p className={styles.coachRole}>Boxing Coach</p>
              <p className={styles.coachBio}>
                A golden gloves champ with a KO-heavy record, Robert polishes your punching game.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <h2>Start Your Journey Today</h2>
          <p>
            Book a free class and see how our expert coaching can transform your training.
          </p>
          <div className={styles.ctaButtons}>
            <a href="#" className={styles.ctaButton}>Book a Free Class</a>
            <a href="#" className={styles.ctaButton}>View Membership Plans</a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
