import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/components/home.module.css'; // optional for home-specific styles

export default function Home() {
  return (
    <>
      <Head>
        <title>Masda Liverpool – MMA Gym</title>
        <meta name="description" content="Train hard, fight smart, and elevate at Masda Liverpool." />
      </Head>

      <Header />

      <main className={styles.main}>
        <h1>Masda Liverpool</h1>
        <p>
          Train Hard. Fight Smart. Elevate.
        </p>
        <a href="/team" className={styles.ctaButton}>
          Meet the team
        </a>
      </main>

      <Footer />
    </>
  );
}
