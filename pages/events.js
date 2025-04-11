import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/components/events.module.css';

export default function EventsPage() {
  return (
    <>
      <Head>
        <title>Events | Masda Liverpool</title>
        <meta
          name="description"
          content="Explore upcoming MMA events and past highlights at Masda Liverpool."
        />
      </Head>

      <Header />

      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div className={styles.heroOverlay}>
          <h1 className={styles.heroTitle}>Championship Night 2025</h1>
          <p className={styles.heroDate}>March 15, 2025 – 7:00 PM EST</p>
          <a href="#" className={styles.heroButton}>Get Tickets</a>
        </div>
      </div>

      <main className={styles.mainContent}>
        {/* Upcoming Events */}
        <section className={styles.upcomingEvents}>
          <h2>Upcoming Events</h2>
          <div className={styles.eventsGrid}>
            {/* Event Card 1 */}
            <div className={styles.eventCard}>
              <img
                src="/events/fighting.jpeg"
                alt="Spring Fighter Series"
                className={styles.eventImage}
              />
              <div className={styles.eventInfo}>
                <h3>May 15 – Spring Fighter Series</h3>
                <p>
                  Join us for a thrilling day of matches featuring up-and-coming fighters.
                </p>
                <a href="#" className={styles.eventButton}>Learn More</a>
              </div>
            </div>

            {/* Event Card 2 */}
            <div className={styles.eventCard}>
              <img
                src="/events/womens-fight-night.jpg"
                alt="Women's Fight Night"
                className={styles.eventImage}
              />
              <div className={styles.eventInfo}>
                <h3>June 10 – Women&apos;s Fight Night</h3>
                <p>
                  A special evening showcasing the top female MMA fighters.
                </p>
                <a href="#" className={styles.eventButton}>Learn More</a>
              </div>
            </div>

            {/* Event Card 3 */}
            <div className={styles.eventCard}>
              <img
                src="/events/grappling-championship.jpg"
                alt="Grappling Championship"
                className={styles.eventImage}
              />
              <div className={styles.eventInfo}>
                <h3>June 30 – Grappling Championship</h3>
                <p>
                  Elite grapplers compete for the championship title.
                </p>
                <a href="#" className={styles.eventButton}>Learn More</a>
              </div>
            </div>
          </div>
        </section>

        {/* Past Events Highlights */}
        <section className={styles.pastEvents}>
          <h2>Past Events Highlights</h2>
          <div className={styles.eventsGrid}>
            {/* Past Event 1 */}
            <div className={styles.eventCard}>
              <img
                src="/events/winter-war-2025.jpg"
                alt="Winter War 2025"
                className={styles.eventImage}
              />
              <div className={styles.eventInfo}>
                <h3>Winter War 2025</h3>
                <p>Relive the intense battles from our January event.</p>
                <a href="#" className={styles.eventButton}>Watch Replay</a>
              </div>
            </div>

            {/* Past Event 2 */}
            <div className={styles.eventCard}>
              <img
                src="/events/championship-finals-2024.jpg"
                alt="Championship Finals 2024"
                className={styles.eventImage}
              />
              <div className={styles.eventInfo}>
                <h3>Championship Finals 2024</h3>
                <p>Catch up on the biggest matches of the year.</p>
                <a href="#" className={styles.eventButton}>Watch Replay</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
