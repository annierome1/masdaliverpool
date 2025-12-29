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
  FaYoutube,
  FaPaperPlane,
  FaTiktok
} from 'react-icons/fa'
import styles from '../styles/components/contact.module.css'

export default function ContactPage() {
  // Handler to open mail app with user input
  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    
    // Check if this is a booking form or contact form
    const isBookingForm = form.querySelector('#coach') !== null;
    
    if (isBookingForm) {
      // Handle booking form submission
      const bookingData = {
        name: form.bookingName.value,
        email: form.bookingEmail.value,
        coach: form.coach.value,
        sessionType: form.sessionType.value,
        preferredDate: form.preferredDate.value,
        preferredTime: form.preferredTime.value,
        message: form.bookingMessage.value,
        type: 'booking'
      };

      try {
        const res = await fetch('/api/email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bookingData),
        });

        const result = await res.json();

        if (result.success) {
          alert('Session booking request sent successfully! We\'ll get back to you soon to confirm your session.');
          form.reset();
        } else {
          alert('There was an error sending your booking request. Please try again later.');
        }
      } catch (error) {
        alert('Unexpected error. Please try again later.');
      }
    } else {
      // Handle contact form submission
      const contactData = {
        name: form.name.value,
        email: form.email.value,
        subject: form.subject.value,
        message: form.message.value,
        type: 'contact'
      };

      try {
        const res = await fetch('/api/email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(contactData),
        });

        const result = await res.json();

        if (result.success) {
          alert('Message sent successfully! We\'ll get back to you soon.');
          form.reset();
        } else {
          alert('There was an error sending your message. Please try again later.');
        }
      } catch (error) {
        alert('Unexpected error. Please try again later.');
      }
    }
  }


  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://masdaliverpool.com'

  return (
    <>
      <Head>
        <title>Contact Us | Masda Liverpool</title>
        <meta
          name="description"
          content="Get in touch with us at Masda Liverpool for any inquiries or class information."
        />
        
        {/* Open Graph */}
        <meta property="og:title" content="Contact Us | MASDA Gym Liverpool" />
        <meta property="og:description" content="Get in touch with MASDA Gym Liverpool for inquiries, class information, or to book a training session. Located in Liverpool, UK." />
        <meta property="og:image" content={`${baseUrl}/masda_logo_color_wt.png`} />
        <meta property="og:url" content={`${baseUrl}/contact`} />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card */}
        <meta name="twitter:title" content="Contact Us | MASDA Gym Liverpool" />
        <meta name="twitter:description" content="Get in touch with MASDA Gym Liverpool for inquiries, class information, or to book a training session." />
        <meta name="twitter:image" content={`${baseUrl}/masda_logo_color_wt.png`} />
      </Head>

      <Header />

      <main className={styles.mainContent}>
        <h1 className={styles.heading}>Contact Us</h1>
        <p className={styles.subtitle}>
          Questions? Get in touch with us!
        </p>

        <div className={styles.contactGrid}>
          {/* ——— Left Card: Contact Form ——— */}
          <div className={`${styles.card} ${styles.formCard}`}>
            <h2>Send Us a Message</h2>
            <form className={styles.contactForm} onSubmit={handleSubmit}>
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

          {/* ——— Right Card: Booking Form ——— */}
          <div className={`${styles.card} ${styles.bookingCard}`}>
            <h2>Book a Training Session</h2>
            <form className={styles.contactForm} onSubmit={handleSubmit}>
              <div className={styles.twoColRow}>
                <input
                  type="text"
                  name="bookingName"
                  placeholder="Your Name"
                  required
                  className={styles.inputField}
                />
                <input
                  type="email"
                  name="bookingEmail"
                  placeholder="you@yourmail.com"
                  required
                  className={styles.inputField}
                />
              </div>

              <div className={styles.formRow}>
                <label htmlFor="coach">Select Coach</label>
                <select id="coach" name="coach" className={styles.inputField} required>
                  <option value="">Choose a coach...</option>
                  <option value="Alex Forman">Alex Forman</option>
                  <option value="Tony Moran">Tony Moran</option>
                  <option value="Alfie Ponting">Alfie Ponting</option>
                  <option value="Owen Gillis">Owen Gillis</option>
                  <option value="Marc Campbell">Marc Campbell</option>
                  <option value="Kenny Carey">Kenny Carey</option>
                  <option value="Hassan Imran">Hassan Imran</option>
                  <option value="Jacob Charnock">Jacob Charnock </option>
                </select>
              </div>


              <div className={styles.formRow}>
                <label htmlFor="preferredDate">Preferred Date</label>
                <input
                  type="date"
                  id="preferredDate"
                  name="preferredDate"
                  className={styles.inputField}
                  required
                />
              </div>

              <div className={styles.formRowFull}>
                <label htmlFor="bookingMessage">Additional Details</label>
                <TextareaAutosize
                  id="bookingMessage"
                  name="bookingMessage"
                  minRows={4}
                  placeholder="Tell us about your experience level, goals, or any specific requirements..."
                  className={styles.inputField}
                  style={{ resize: 'none' }}
                />
              </div>

              <button type="submit" className={styles.sendButton}>
                <FaPaperPlane className={styles.sendIcon} />
                Book Session
              </button>
            </form>
          </div>
        </div>

        {/* ——— Full-width Contact Info Card ——— */}
        <div className={styles.contactInfoSection}>
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
              <span>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=MASDA+Gym+Liverpool,+Nexum+Centre+64+St+Anne+Street,+Liverpool+L3+3DY"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "inherit" }}
                >
                  MASDA Gym Liverpool, Nexum Centre 64 St Anne Street, Liverpool L3 3DY
                </a>
              </span>
            </li>
            </ul>

            <h3>Connect With Us</h3>
            <div className={styles.socialLinks}>
              <Link href="https://www.facebook.com/masdagym/" aria-label="Facebook">
                <FaFacebookF />
              </Link>
              <Link href="https://www.instagram.com/masdagym/?hl=en" aria-label="Instagram">
                <FaInstagram />
              </Link>
              <Link href="https://www.youtube.com/c/MasdaGymLiverpool" aria-label="YouTube">
                <FaYoutube />
              </Link>
              <Link href="https://www.tiktok.com/@masdagym" target="_blank" rel="noopener noreferrer">
                <FaTiktok />
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
