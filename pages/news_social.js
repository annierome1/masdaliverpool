// pages/news.js
import { useState, useRef, useEffect} from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import styles from '../styles/components/news.module.css'
import { FaInstagram, FaUserCircle } from 'react-icons/fa'
import { useInstagramFeed } from '../utils/instaCache'

export async function getStaticProps() {

  // change to use news.json 
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
  

  return {
    props: { newsItems },
    revalidate: 300,
  }
}

export default function NewsPage({ newsItems }) {
  const { feed: instaPosts, error } = useInstagramFeed()
  const [active, setActive] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const carouselRef = useRef(null)
  const sectionRef = useRef(null)
  const touchStartX = useRef(0)

  // detect mobile
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  function centerCarouselSection() {
  const sec = sectionRef.current
  if (!sec) return

  const rect  = sec.getBoundingClientRect()
  const top   = window.pageYOffset || document.documentElement.scrollTop
  const target =
    rect.top + top               
    - (window.innerHeight  / 2)   
    + (rect.height         / 2)   

  window.scrollTo({ top: target, behavior: 'smooth' })
}


function scrollCardIntoView(idx) {
  const wr = carouselRef.current;
  if (!wr) return;
  const card = wr.children[idx];
  if (!card) return;

  // compute an offset so the card ends up centered
  const offset = (wr.clientWidth - card.clientWidth) / 2;

  wr.scrollTo({
    left: card.offsetLeft - offset,
    behavior: 'smooth'
  });
}


const prev = () => {
  const nextIdx = (active - 1 + instaPosts.length) % instaPosts.length
  setActive(nextIdx)
  scrollCardIntoView(nextIdx)
  centerCarouselSection()
}

const next = () => {
  const nextIdx = (active + 1) % instaPosts.length
  setActive(nextIdx)
  scrollCardIntoView(nextIdx)
  centerCarouselSection()
}


  const onTouchStart = e => {
    touchStartX.current = e.touches[0].clientX
  }

  const onTouchEnd = e => {
    const delta = e.changedTouches[0].clientX - touchStartX.current
    if (delta > 50) prev()
    if (delta < -50) next()
  }

  return (
    <>
      <Head>
        <title>News & Social | Masda Liverpool</title>
      </Head>
      <Header />

      <main className={styles.main}>
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


        {/* Instagram Feed Section */}
        <section ref={sectionRef} className={styles.instaSection}>
          <h2 className={styles.sectionTitle}>
            <FaInstagram className={styles.instaIcon} /> Instagram Feed
          </h2>

          {error && <p className={styles.error}>Error loading Instagram feed.</p>}

          {!instaPosts ? (
            <p>Loading Instagram…</p>
          ) : (
            <>
              <div
                className={styles.instaCarousel}
                onTouchStart={isMobile ? onTouchStart : undefined}
                onTouchEnd={isMobile ? onTouchEnd : undefined}
              >
                <div className={styles.instaCarouselInner} ref={carouselRef}>
                  {instaPosts.map((post, idx) => (
                    <div 
                      key ={post.id}
                      className={`${styles.instaCardWrapper} ${
                        idx === active ? styles.active : ''
                      }`}
                    >
                    <a
                      key={post.id}
                      href={post.permalink}
                      target="_blank"
                      rel="noreferrer"
                      className={`${styles.instaCard} ${
                        idx === active ? styles.active : ''
                      }`}
                    >
                      <div className={styles.imageWrapper}>
                        <img
                          src={
                            post.media_type === 'VIDEO'
                              ? post.thumbnail_url
                              : post.media_url
                          }
                          alt={post.caption?.slice(0, 100) || 'Instagram post'}
                          className={styles.instaImage}
                        />
                      </div>
                      <p className={styles.caption}>
                        {post.caption?.split('\n')[0]?.slice(0, 100)}…
                      </p>
                    </a>
                    </div>
                  ))}
                </div>
              </div>

              {!isMobile && (
                <div className={styles.carouselControls}>
                  <button className={styles.arrow} onClick={prev}>
                    ‹
                  </button>
                  <button className={styles.arrow} onClick={next}>
                    ›
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </main>

      <Footer />
    </>
  )
}
