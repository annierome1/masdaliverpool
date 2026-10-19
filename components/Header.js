import styles from '../styles/components/header.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';

const navLinks = [
  ['The Gym', '/the_gym'],
  ['Classes', '/classes'],
  ['Memberships', '/memberships'],
  ['Events', '/fightnight'],
  ['Contact Us', '/contact'],
];

export default function Header() {
  const router = useRouter();
  const currentPath = router.pathname;
  const [menuOpen, setMenuOpen] = useState(false);

  // Animation state for logo
  const logoRef = useRef(null);
  const [hasPlayed, setHasPlayed] = useState(false);

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
            priority
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
          {navLinks.map(([label, href]) => (
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
          {navLinks.map(([label, href]) => (
            <li key={href}>
              <Link href={href} className={`${styles.link} ${currentPath === href ? styles.active : ''}`}>{label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
