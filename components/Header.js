import styles from '../styles/components/header.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Header() {
  const router = useRouter();
  const currentPath = router.pathname;

  return (
    <header className={styles.header}>
      {/* Logo */}
      <Link href="/" className={styles.logoBox}>
        <Image
          src="/masda_logo_color_wt.png"
          alt="Masda Liverpool Logo"
          width={200}
          height={100}
          style={{ objectFit: 'contain' }}
        />
      </Link>

      {/* Navigation */}
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li>
            <Link
              href="/classes"
              className={`${styles.link} ${currentPath === '/classes' ? styles.active : ''}`}
            >
              Classes
            </Link>
          </li>
          <li>
            <Link
              href="/events"
              className={`${styles.link} ${currentPath === '/events' ? styles.active : ''}`}
            >
              Events
            </Link>
          </li>
          <li>
            <Link
              href="/the_gym"
              className={`${styles.link} ${currentPath === '/the_gym' ? styles.active : ''}`}
            >
              The Gym
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className={`${styles.link} ${currentPath === '/contact' ? styles.active : ''}`}
            >
              Contact Us
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
