// components/Footer.jsx
import styles from '../styles/components/footer.module.css'
import { FaInstagram, FaFacebookF, FaYoutube } from 'react-icons/fa'
import Image from 'next/image'
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        {/* Quick Links */}
        <div className={styles.column}>
          <h3>Quick Links</h3>
          <ul className={styles.linkList}>
            <li>
              <Link href="/classes" className={styles.link}>
                Classes
              </Link>
            </li>
            <li>
              <Link href="/pricing" className={styles.link}>
                Pricing
              </Link>
            </li>
            <li>
              <Link href="/contact" className={styles.link}>
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Logo & Tagline */}
        <div className={`${styles.column} ${styles.logo}`}>
          <Image src="/masda_logo.png" alt="Logo" width={180} height={80} />
          <p className={styles.tagline}>
            Train Hard. Fight Smart. Elevate.
          </p>
        </div>

        {/* Social Icons */}
        <div className={styles.column}>
          <h3>Follow Us</h3>
          <div className={styles.socialIcons}>
            <Link href="https://www.instagram.com/masdagym/?hl=en" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </Link>
            <Link href="https://www.facebook.com/masdagym/" target="_blank" rel="noopener noreferrer">
              <FaFacebookF />
            </Link>
            <Link href="https://www.youtube.com/c/MasdaGymLiverpool" target="_blank" rel="noopener noreferrer">
              <FaYoutube />
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        © 2025 Masda Liverpool. All rights reserved.
      </div>
    </footer>
  )
}
