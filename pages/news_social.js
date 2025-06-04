// pages/news.js
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import {
  FaInstagram,
  FaUserCircle,
} from 'react-icons/fa'
import styles from '../styles/components/news.module.css'

const newsItems = [
    {
    id: 1,
    title: 'MASDA Gym Liverpool Awarded Thai Fighter UK’s Gym of the Year 2024',
    text:
      'MASDA Gym Liverpool has been awarded the prestigious UK Gym of the Year 2024 by Thai Fighter UK. Their success across such a wide range of platforms has set a new standard for excellence in the sport.',
    author: 'Fight Record',
    url: 'https://fightrecord.co.uk/news/masda-gym-liverpool-awarded-thai-fighter-uks-gym-of-the-year-2024/',
  },
  {
    id: 2,
    title: 'MASDA Gym Fighters Take Over Bangkok’s Biggest Stages in Historic Week for UK Muay Thai',
    text:
      "MASDA Gym in Liverpool is set to make history, as eight of its fighters compete across the sport’s biggest global arenas in just eight days",
    author: 'Fight Record',
    url: 'https://fightrecord.co.uk/news/masda-gym-fighters-take-over-bangkoks-biggest-stages-in-historic-week-for-uk-muay-thai/',
  },

  {
    id: 3,
    title: 'Teen destined to be \'household name\' after becoming youngest champion',
    text:
      'Alfie Ponting, A passionate fighter who got off to a flying start in the art of Muay Thai boxing has become the youngest ever world champion at just 18-years-old.',
    author: 'Liverpool Echo',
    url: 'https://www.liverpoolecho.co.uk/news/liverpool-news/teen-destined-household-name-after-29243895',
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
                </div>
                <h3 className={styles.newsTitle}>
                <a href={item.url} target="_blank" rel="noreferrer">
                  {item.title}
                </a>
              </h3>
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
