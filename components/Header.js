import styles from '../styles/components/header.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className={styles.header}>
      {/* Logo */}
      
      
      <Link href="/" className={styles.logoBox}>
        <Image
          src="/masda_logo.png"      // Make sure this file is in /public
          alt="Masda Liverpool Logo"
          width={180}                // Adjust as needed
          height={80}                // Adjust as needed
          style={{ objectFit: 'contain' }} // Prevent squishing
        />
        </Link>
      

      {/* Navigation */}
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li>
            {/* Modern Next.js usage (no <a> inside) */}
            <Link href="/classes" className={styles.link}>
              Classes
            </Link>
          </li>
          <li>
            <Link href="/events" className={styles.link}>
              Events
            </Link>
          </li>
          <li>
            <Link href="/the_gym" className={styles.link}>
              The Gym
            </Link>
          </li>
          <li>
            <Link href="/contact" className={styles.link}>
              Contact Us
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
