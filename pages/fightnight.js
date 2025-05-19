// pages/events.js
import fs from 'fs';
import path from 'path';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useEffect, useRef, useState } from 'react';
import styles from '../styles/components/fightnight.module.css';
import '@mux/mux-player';



export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'public', 'data', 'events.json')
  const raw       = fs.readFileSync(filePath, 'utf8')
  const eventsData = JSON.parse(raw)

  const ASSET_IDS = [
    'zhS01F02IEgn0002lrF02teN49RClPKmZE352k6uF194b02hs',
    'sfQUYGzTA1ZM4SExer1JehNBb2HIENyoClS1Tvj1sYM',
    'XGNhVi7vjJIUdnSJCRgLg01zLniRPXZD5jwI4zC02YZ900',
  ]

  const token = Buffer.from(
    `${process.env.MUX_TOKEN_ID}:${process.env.MUX_TOKEN_SECRET}`
  ).toString('base64')

  const eventHighlights = await Promise.all(
    ASSET_IDS.map(async (assetId) => {
      const res = await fetch(
        `https://api.mux.com/video/v1/assets/${assetId}`,
        {
          headers: {
            Authorization: `Basic ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )
      const { data: asset } = await res.json()
      // find the public playback ID
      const playback = asset.playback_ids.find(p => p.policy === 'public')
      return {
        id: asset.id,
        playbackId: playback.id,
      }
    })
  )

  return {
    props: {
      eventsData,
      eventHighlights,
    },
  }
}









export default function EventsPage({ eventsData, eventHighlights }) {
  const videoRefs = useRef([])
  const wrapperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false)
 
    useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.5 }
    )
    if (wrapperRef.current) observer.observe(wrapperRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    videoRefs.current.forEach((video, idx) => {
      if (!video) return
      if (idx === activeIndex && isVisible) {
        video.play().catch(() => {})
      } else {
        video.pause()
        video.currentTime = 0
      }
    })
  }, [activeIndex, isVisible])

  const prev = () => setActiveIndex((i) => Math.max(0, i - 1))
  const next = () => setActiveIndex((i) => Math.min(eventHighlights.length - 1, i + 1))


  return (
    <>
      <Head>
        <title>Events | Masda Liverpool</title>
        <meta
          name="description"
          content="Explore upcoming events and highlights from Masda Fight Nights."
        />
      </Head>

      <Header />
      <div className={styles.heroSection}>
        <div className={styles.heroOverlay}>
          <h1 className={styles.heroTitle}>Masda Fight Nights</h1>
        </div>
      </div>

      <main className={styles.mainContent}>
        {/* Upcoming Events */}
        <section className={styles.upcomingEvents}>
          <h2>Upcoming Events</h2>
          <div className={styles.eventsGrid}>
            {eventsData.upcoming.map((event) => (
              <div key={event.id} className={styles.eventCard}>
                <img
                  src={event.image}
                  alt={event.title}
                  className={styles.eventImage}
                />
                <div className={styles.eventInfo}>
                  <h3>{event.date} – {event.title}</h3>
                  <p>{event.description}</p>
                  <Link href={event.link} className={styles.eventButton}>
                    {event.buttonText}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>


    <section className={styles.eventHighlights}>
          <h2>Highlight Reel</h2>

          <div className={styles.carouselContainer}>
            <button onClick={prev} className={styles.arrowButton}>
              &lsaquo;
            </button>

            <div ref={wrapperRef} className={styles.carouselWrapper}>
              {eventHighlights.map((highlight, index) => (
                <div
                  key={highlight.id}
                  className={`${styles.videoCard} ${
                    index === activeIndex ? styles.active : ''
                  }`}
                  onClick={() => setActiveIndex(index)}
                >
                  <div className={styles.videoWrapper}>
                    <mux-player
                      ref={(el) => (videoRefs.current[index] = el)}
                      src={`https://stream.mux.com/${highlight.playbackId}.m3u8`}
                      controls
                      preload="metadata"
                      className={styles.videoPlayer}
                    />
                  </div>
                </div>
              ))}
            </div>

            <button onClick={next} className={styles.arrowButton}>
              &rsaquo;
            </button>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
