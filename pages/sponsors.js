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
            <img
              src="/sponsors/brick_barn.png"
              alt="Brick & Barn"
              style={{
                width: '300px',
                height: 'auto',
                objectFit: 'contain',
                marginBottom: '3rem',
                marginTop: '4rem'
              }}
            />
            <h3>Brick & Barn | Compass</h3>
            <p>Helping us lay the foundation for future champions.</p>
             <a
      href="https://brickandbarngroup.com/agents/scott-rome"
      target="_blank"
      rel="noreferrer"
      className={styles.learnMore}
    >
      Learn More 
    </a>
          </div>

          <div className={styles.sponsorCard}>
            <img src="/sponsors/concordia_banner.jpg" alt="Concordia Clinic" />
            <h3>Concordia Clinic</h3>
            <p>Providing health and recovery support for our athletes.</p>
            <a
      href="https://concordiaclinic.com/"
      target="_blank"
      rel="noreferrer"
      className={styles.learnMore}
    >
      Learn More 
    </a>
          </div>
          <div className={styles.sponsorCard}>
            <img 
              src="/sponsors/primo_white.png" 
              alt="Primo Fightwear" 
              style={{
                width: '300px',
                height: 'auto',
                objectFit: 'contain',
                marginBottom: '3rem',
                marginTop: '4rem'
              }}/>
            <h3>Primo Fightwear</h3>
            <p>Providing health and recovery support for our athletes.</p>
            <a
      href="https://www.primofightwear.com/"
      target="_blank"
      rel="noreferrer"
      className={styles.learnMore}
    >
      Learn More 
    </a>
          </div>

        </section>
      </main>

      <Footer />
    </>
  );
}
