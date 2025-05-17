import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/components/sponsors.module.css';

export default function SponsorsPage() {
  return (
    <>
      <Head>
        <title>Our Sponsors | Masda Liverpool</title>
        <meta
          name="description"
          content="Meet the proud sponsors of Masda Liverpool. We thank them for their support in building our fight community."
        />
      </Head>

      <Header />

      <main className={styles.mainContent}>
        <h1 className={styles.heading}>Our Sponsors</h1>
        <p className={styles.subheading}>
          We’re proud to be backed by a network of amazing partners who support our fighters, community, and vision.
        </p>

        <section className={styles.sponsorGrid}>
          {/* Repeat this card for each sponsor */}
          <div className={styles.sponsorCard}>
            <img src="/sponsors/B&B_logo.png" alt="Brick & Barn" />
            <h3>Brick & Barn | Compass</h3>
            <p>Helping us lay the foundation for future champions.</p>
          </div>

          <div className={styles.sponsorCard}>
            <img src="/sponsors/concordia_clinic.png" alt="Concordia Clinic" />
            <h3>Concordia Clinic</h3>
            <p>Providing health and recovery support for our athletes.</p>
          </div>

          {/* Add more sponsors below as needed */}
        </section>
      </main>

      <Footer />
    </>
  );
}
