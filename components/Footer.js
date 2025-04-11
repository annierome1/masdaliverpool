import styles from '../styles/components/footer.module.css';
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div>
          <Image src="/masda_logo.png" alt="Logo" width={180} height={80} />
          <p className="mt-4 text-gray-400">Train Hard. Fight Smart. Elevate.</p>
        </div>
        <div className={styles.column}>
          <h3>Quick Links</h3>
          <ul className={styles.linkList}>
            <li><a href="#">Classes</a></li>
            <li><a href="#">Events</a></li>
            <li><a href="#">Pricing</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
        <div className={styles.column}>
          <h3>Follow Us</h3>
          <div className={styles.socialIcons}>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaYoutube /></a>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        © 2025 Masda Liverpool. All rights reserved.
      </div>
    </footer>
  );
}
