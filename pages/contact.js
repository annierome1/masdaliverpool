import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TextareaAutosize from 'react-textarea-autosize';
import styles from '../styles/components/contact.module.css';

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

        {/* Contact Info Section */}
        <section className={styles.infoSection}>
          <div className={styles.infoBlock}>
            <h2>Location</h2>
            <p>
              123 Liverpool St,<br />Liverpool, UK
            </p>
            <p>Open Mon–Sat: 6am–10pm</p>
          </div>
          <div className={styles.infoBlock}>
            <h2>Phone</h2>
            <p>+44 1234 567890</p>
            <p>Mon–Sat: 8am–8pm</p>
          </div>
          <div className={styles.infoBlock}>
            <h2>Email</h2>
            <p>info@masdaliverpool.com</p>
            <p>We usually respond within 24 hours</p>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className={styles.formSection}>
          <h2>Send Us a Message</h2>
          <form className={styles.contactForm}>
            {/* Row: First & Last Name Side by Side with Placeholders */}
            <div className={styles.twoColRow}>
              <div>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                  required
                  className={styles.inputField}
                />
              </div>
              <div>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                  required
                  className={styles.inputField}
                />
              </div>
            </div>

            {/* Email Row: Stacked */}
            <div className={styles.formRow}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className={styles.inputField}
              />
            </div>

            {/* Subject Row: Stacked */}
            <div className={styles.formRow}>
              <label htmlFor="subject">Subject</label>
              <select id="subject" name="subject" className={styles.inputField}>
                <option>General Inquiry</option>
                <option>Membership</option>
                <option>Classes</option>
                <option>Personal Training</option>
              </select>
            </div>

            {/* Full-Width: Message */}
            <div className={styles.formRowFull}>
              <label htmlFor="message">Your Message</label>
              <TextareaAutosize
                id="message"
                name="message"
                minRows={5}
                placeholder="Type your message here..."
                required
                className={styles.inputField}
                // Disable manual resize via CSS property
                style={{ resize: 'none' }}
              />
            </div>

            <button type="submit" className={styles.sendButton}>
              Send Message
            </button>
          </form>
        </section>

        {/* Google Maps Section */}
        <section className={styles.mapSection}>
          <div className={styles.mapWrapper}>
            <iframe
              className={styles.mapEmbed}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2381.6942222600136!2d-2.9784815842888294!3d53.40719377900265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487b2133bf6bb21f%3A0xab7f045ec20122ed!2sLiverpool%2C%20UK!5e0!3m2!1sen!2sus!4v1644282377689!5m2!1sen!2sus"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
