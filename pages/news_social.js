// pages/news.js
import { useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import styles from '../styles/components/news.module.css'
import { FaInstagram, FaUserCircle } from 'react-icons/fa'
import { useInstagramFeed } from '../utils/instaCache'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'

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
  const sectionRef = useRef(null)

  // Swiper and arrow refs
  const prevRef = useRef(null)
  const nextRef = useRef(null)
  const swiperRef = useRef(null)


  // Make sure Swiper navigation binds to DOM refs after mount
  useEffect(() => {
    if (
      swiperRef.current &&
      swiperRef.current.swiper &&
      prevRef.current &&
      nextRef.current
    ) {
      // Set navigation elements
      swiperRef.current.swiper.params.navigation.prevEl = prevRef.current
      swiperRef.current.swiper.params.navigation.nextEl = nextRef.current
      swiperRef.current.swiper.navigation.destroy()
      swiperRef.current.swiper.navigation.init()
      swiperRef.current.swiper.navigation.update()
    }
  }, [instaPosts])

  return (
    <>
      <Head>
        <title>News & Social | Masda Liverpool</title>
      </Head>
      <Header />

      <main className={styles.main}>
        <h2 className={styles.sectionTitle}>Latest News</h2>
        <section className={styles.newsSection}>
          <div className={styles.newsGrid}>
            {newsItems.map((item) => (
              <div key={item.id} className={styles.newsCard}>
                <div className={styles.meta}></div>
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
            <div className={styles.instaSwiperWrapper}>
              {/* Custom Arrows */}
              <button ref={prevRef} className={styles.customArrow + ' ' + styles.leftArrow}>
                &#8249;
              </button>
              <Swiper
                ref={swiperRef}
                modules={[Navigation]}
                spaceBetween={80}
                slidesPerView={1} // default is 1 card for mobile
                breakpoints={{
                  640: { slidesPerView: 2 },
                  1000: { slidesPerView: 2},
                  1150: { slidesPerView: 3 },
                  1400: { slidesPerView: 4 }, 
                }}
                              navigation={{
                  prevEl: prevRef.current,
                  nextEl: nextRef.current,
                }}
                loop
                className={styles.instaSwiper}
              >
                {instaPosts.map((post, idx) => (
                  <SwiperSlide key={post.id + '_' + idx}>
                    <a
                      href={post.permalink}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.instaCard}
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
                  </SwiperSlide>
                ))}
              </Swiper>
              <button ref={nextRef} className={styles.customArrow + ' ' + styles.rightArrow}>
                &#8250;
              </button>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}
