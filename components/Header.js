import styles from '../styles/components/header.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';

export default function Header() {
  const router = useRouter();
  const currentPath = router.pathname;
  const [menuOpen, setMenuOpen] = useState(false);

  // Animation state for logo
  const logoRef = useRef(null);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);

  useEffect(() => {
    if (!logoRef.current) return;
    if (hasPlayed) return;

    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasPlayed) {
            setHasPlayed(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );
    observer.observe(logoRef.current);
    return () => observer.disconnect();
  }, [hasPlayed]);

  return (
    <header className={styles.header}>
      {/* Logo */}
      <Link href="/" className={styles.logoBox} ref={logoRef}>
          <Image
            src="/masda_logo_color_wt.png"
            alt="Masda Liverpool Logo"
            width={180}
            height={90}
            style={{ objectFit: 'contain' }}
          />
      </Link>

      {/* Hamburger toggle (visible <768px) */}
      <button
        className={`${styles.menuToggle} ${menuOpen ? styles.open : ''}`}
        onClick={() => setMenuOpen(o => !o)}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Full-screen overlay nav */}
      <nav
        className={`${styles.navOverlay} ${menuOpen ? styles.open : ''}`}
        onClick={() => setMenuOpen(false)}
      >
        <ul className={styles.navListOverlay} onClick={e => e.stopPropagation()}>
          {[
            ['Classes', '/classes'],
            ['Events', '/fightnight'],
            ['The Gym', '/the_gym'],
            ['Partners', '/sponsors'],
            ['Foundation', '/foundation'],
            ['News & Social', '/news_social'],
            ['Contact Us', '/contact'],
          ].map(([label, href]) => (
            <li key={href}>
              <Link
                href={href}
                className={`${styles.link} ${
                  currentPath === href ? styles.active : ''
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Navigation */}
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li>
            <Link href="/classes" className={`${styles.link} ${currentPath === '/classes' ? styles.active : ''}`}>Classes</Link>
          </li>
          <li>
            <Link href="/fightnight" className={`${styles.link} ${currentPath === '/fightnight' ? styles.active : ''}`}>Events</Link>
          </li>
          <li>
            <Link href="/the_gym" className={`${styles.link} ${currentPath === '/the_gym' ? styles.active : ''}`}>The Gym</Link>
          </li>
          <li>
            <Link href="/sponsors" className={`${styles.link} ${currentPath === '/sponsors' ? styles.active : ''}`}>Partners</Link>
          </li>
          <li>
            <Link href="/foundation" className={`${styles.link} ${currentPath === '/foundation' ? styles.active : ''}`}>Fighter Foundation</Link>
          </li>
          <li>
            <Link href="/news_social" className={`${styles.link} ${currentPath === '/news_social' ? styles.active : ''}`}>News & Social</Link>
          </li>
          <li>
            <Link href="/contact" className={`${styles.link} ${currentPath === '/contact' ? styles.active : ''}`}>Contact Us</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
