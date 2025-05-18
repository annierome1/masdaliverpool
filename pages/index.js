import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/components/home.module.css'; 
import buttonStyles from '../styles/components/buttons.module.scss';

export default function Home() {
  return (
    <>
      <Head>
        <title>MASDA LIVERPOOL</title>
        <meta name="description" content="Train hard, fight smart, and elevate at Masda Liverpool." />
      </Head>

      <Header />

      <main className={styles.main}>
        <h1>MASDA GYM LIVERPOOL</h1>
        <p>
          Train Hard. Fight Smart. Elevate.
        </p>
       <Link href="/team" className={buttonStyles.rbutton}>
          Meet the team
        </Link>
      </main>

      <Footer />
    </>
  );
}
