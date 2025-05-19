import Head from 'next/head'
import Link from 'next/link';
import Header from '../components/Header'
import Footer from '../components/Footer'
import TextareaAutosize from 'react-textarea-autosize'
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaPaperPlane
} from 'react-icons/fa'
import styles from '../styles/components/contact.module.css'

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact Us | Masda Liverpool</title>
        <meta
          name="description"
          content="Get in touch with us at Masda Liverpool for any inquiries or class information."
        />
      </Head>

      <Header />

      <main className={styles.mainContent}>
        <h1 className={styles.heading}>Contact Us</h1>
        <p className={styles.subtitle}>
          Questions? Ready to book a session? Get in touch with us!
        </p>

        <div className={styles.contactGrid}>
          {/* ——— Left Card: Form ——— */}
          <div className={`${styles.card} ${styles.formCard}`}>
            <h2>Send Us a Message</h2>
            <form className={styles.contactForm}>
              <div className={styles.twoColRow}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  className={styles.inputField}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="you@yourmail.com"
                  required
                  className={styles.inputField}
                />
              </div>

              <div className={styles.formRow}>
                <label htmlFor="subject">Subject</label>
                <select id="subject" name="subject" className={styles.inputField}>
                  <option>General Inquiry</option>
                  <option>Membership</option>
                  <option>Classes</option>
                  <option>Personal Training</option>
                </select>
              </div>

              <div className={styles.formRowFull}>
                <label htmlFor="message">Message</label>
                <TextareaAutosize
                  id="message"
                  name="message"
                  minRows={5}
                  placeholder="Type your message here..."
                  required
                  className={styles.inputField}
                  style={{ resize: 'none' }}
                />
              </div>

              <button type="submit" className={styles.sendButton}>
                <FaPaperPlane className={styles.sendIcon} />
                Send Message
              </button>
            </form>
          </div>

          {/* ——— Right Card: Contact Info + Social ——— */}
          <div className={`${styles.card} ${styles.infoCard}`}>
            <h2>Contact Information</h2>
            <ul className={styles.contactList}>
              <li>
                <FaPhone />
                <span>+44 1234 567 890</span>
              </li>
              <li>
                <FaEnvelope />
                <span>info@masdaliverpool.com</span>
              </li>
              <li>
                <FaMapMarkerAlt />
                <span>123 Liverpool St, Liverpool, UK</span>
              </li>
            </ul>

            <h3>Connect With Us</h3>
            <div className={styles.socialLinks}>
              <Link href="#" aria-label="Facebook">
                <FaFacebookF />
              </Link>
              <Link href="#" aria-label="Instagram">
                <FaInstagram />
              </Link>
              <Link href="#" aria-label="TikTok">
                <FaTiktok />
              </Link>
              <Link href="#" aria-label="YouTube">
                <FaYoutube />
              </Link>
            </div>
          </div>
        </div>

        {/* ——— Full-width Map Card ——— */}
        <div className={styles.mapCard}>
          <iframe
            className={styles.mapEmbed}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2378.063074825816!2d-2.9774971999999997!3d53.4136981!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487b210c63fa536d%3A0xb8f8e8aca48cca5a!2sMasda%20Gym%20Liverpool!5e0!3m2!1sen!2sus!4v1747614404867!5m2!1sen!2sus" 
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </main>

      <Footer />
    </>
  )
}
