// pages/news.js
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import {
  FaInstagram,
  FaCalendarAlt,
  FaUserCircle,
} from 'react-icons/fa'
import styles from '../styles/components/news.module.css'

const newsItems = [
  {
    id: 1,
    date: 'May 19, 2025',
    title: 'MASDA Gym Fighters Take Over Bangkok’s Biggest Stages in Historic Week for UK Muay Thai',
    text:
      "MASDA Gym in Liverpool is set to make history this May, as eight of its fighters compete across the sport’s biggest global arenas in just eight days",
    author: 'Fight Record',
  },
  {
    id: 2,
    date: 'May 15, 2025',
    title: 'New Training Gear Arrived!',
    text:
      'Fresh gloves, pads, and wraps are now available for all members. Check out the pro shop before your next session!',
    author: 'Sara Lee',
  },
  {
    id: 3,
    date: 'May 10, 2025',
    title: 'Kids Muay Thai Classes Every Saturday',
    text:
      'Sign up your little ones for our fun-focused, safe, and high-energy classes every Saturday 10AM!',
    author: 'Coach May',
  },
  {
    id: 4,
    date: 'May 5, 2025',
    title: 'Fighter Spotlight: Jason “The Jet” Nguyen',
    text:
      'Get to know our rising star Jason—his journey and upcoming bouts. You won’t want to miss his story.',
    author: 'Gym Team',
  },
]

const instaPosts = [
  {
    id: 1,
    image: '/placeholders/insta1.jpg',
    title: 'Training Day Grind',
    caption: '“Push harder than yesterday!”',
  },
  {
    id: 2,
    image: '/placeholders/insta2.jpg',
    title: 'Sparring Moments',
    caption: 'Tension & respect in every round.',
  },
  {
    id: 3,
    image: '/placeholders/insta3.jpg',
    title: 'Team Spirit',
    caption: 'Proud of our squad!',
  },
  {
    id: 4,
    image: '/placeholders/insta4.jpg',
    title: 'Future Champs',
    caption: 'Kids class energy is unmatched!',
  },
  {
    id: 5,
    image: '/placeholders/insta5.jpg',
    title: 'Victory!',
    caption: 'Another W for the gym!',
  },
]

export default function NewsPage() {
  return (
    <>
      <Head>
        <title>News & Social | Masda Liverpool</title>
        <meta
          name="description"
          content="Latest news, event updates, and our Instagram feed."
        />
      </Head>

      <Header />

      <main className={styles.main}>
        {/* News Section */}
        <section className={styles.newsSection}>
          <h2 className={styles.sectionTitle}>Latest News</h2>
          <div className={styles.newsGrid}>
            {newsItems.map((item) => (
              <div key={item.id} className={styles.newsCard}>
                <div className={styles.meta}>
                  <FaCalendarAlt className={styles.icon} />
                  <time>{item.date}</time>
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <div className={styles.author}>
                  <FaUserCircle className={styles.icon} />
                  <span>{item.author}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Instagram Feed */}
        <section className={styles.instaSection}>
          <h2 className={styles.sectionTitle}>
            <FaInstagram className={styles.instaIcon} /> Instagram Feed
          </h2>
          <div className={styles.instaGrid}>
            {instaPosts.map((post) => (
              <div key={post.id} className={styles.instaCard}>
                <div className={styles.imageWrapper}>
                  <img
                    src={post.image}
                    alt={post.title}
                    className={styles.instaImage}
                  />
                  <FaInstagram className={styles.cornerIcon} />
                </div>
                <h4>{post.title}</h4>
                <p className={styles.caption}>{post.caption}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
