// pages/fightnight.js
import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useRef, useState, useEffect, useCallback } from 'react'
import styles from '../styles/components/fightnight.module.css'
import AWS from 'aws-sdk'
import { client, urlFor } from '../lib/sanity'

export async function getStaticProps() {
  const upcoming = await client.fetch(`
    *[_type == "upcomingEvent"]
    | order(dateTime asc){
      "id": _id,
      title,
      fightTitle,
      location,
      dateTime,
      fighterA,
      fighterB,
      link,
      buttonText,
      image
    }
  `)

  const s3 = new AWS.S3({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  })
  const Bucket = process.env.AWS_S3_BUCKET_NAME
  const Folder = 'videos/fightnight/'
  const { Contents } = await s3.listObjectsV2({ Bucket, Prefix: Folder }).promise()
  const eventHighlights = Contents
    .filter((f) => /\.(mp4|mov)$/.test(f.Key))
    .map((file, i) => ({
      id: `video-${i}`,
      url: `https://${Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.Key}`,
    }))

  return {
    props: { eventsData: { upcoming }, eventHighlights },
    revalidate: 60,
  }
}

export default function EventsPage({ eventsData, eventHighlights }) {
  const { upcoming } = eventsData
  const eventsWrapperRef = useRef(null)
  const videoWrapperRef = useRef(null)
  const videoRefs = useRef([])

  const [isMobile, setIsMobile] = useState(false)
  const [hasOverflow, setHasOverflow] = useState(false)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const [activeIndex, setActiveIndex] = useState(0)
  const onVideoEnded = () => {
    if (!isMobile) return
    setActiveIndex((i) => Math.min(eventHighlights.length - 1, i + 1))
  }

  // 1) detect mobile & overflow, set initial arrow states
  useEffect(() => {
    const recalc = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)

      const el = eventsWrapperRef.current
      if (!el) return
      const overflow = el.scrollWidth > el.clientWidth
      setHasOverflow(overflow)

      const pos = el.scrollLeft
      setCanScrollPrev(pos > 5)
      setCanScrollNext(pos + el.clientWidth < el.scrollWidth - 5)
    }
    recalc()
    window.addEventListener('resize', recalc)
    return () => window.removeEventListener('resize', recalc)
  }, [])

  // 2) update arrows on scroll
  useEffect(() => {
    const el = eventsWrapperRef.current
    if (!el) return
    const onScroll = () => {
      const pos = el.scrollLeft
      setCanScrollPrev(pos > 5)
      setCanScrollNext(pos + el.clientWidth < el.scrollWidth - 5)
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  // 3) scroll helper that clamps and smooth‐scrolls
  const scrollEventsBy = (dir) => {
    const el = eventsWrapperRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    const target = Math.min(Math.max(el.scrollLeft + dir * el.clientWidth, 0), max)
    el.scrollTo({ left: target, behavior: 'smooth' })
  }

  // 4) video play/pause logic
  useEffect(() => {
    videoRefs.current.forEach((vid, idx) => {
      if (!vid) return
      if (idx === activeIndex) vid.play().catch(() => {})
      else {
        vid.pause()
        vid.currentTime = 0
      }
    })
  }, [activeIndex])

  // 5) desktop video scroll‐to
  useEffect(() => {
    if (isMobile) return
    const wr = videoWrapperRef.current
    if (!wr) return
    const max = wr.scrollWidth - wr.clientWidth
    const target = Math.min(activeIndex * wr.clientWidth, max)
    wr.scrollTo({ left: target, behavior: 'smooth' })
  }, [activeIndex, isMobile])

  // 6) mobile video swipe sync
  const handleVideosScroll = useCallback(() => {
    if (!isMobile) return
    const wr = videoWrapperRef.current
    if (!wr) return
    const { scrollLeft, children } = wr
    let closest = 0,
      minDiff = Infinity
    Array.from(children).forEach((child, i) => {
      const diff = Math.abs(child.offsetLeft - scrollLeft)
      if (diff < minDiff) {
        minDiff = diff
        closest = i
      }
    })
    setActiveIndex(closest)
  }, [isMobile])

  useEffect(() => {
    const wr = videoWrapperRef.current
    if (wr) wr.addEventListener('scroll', handleVideosScroll, { passive: true })
    return () => wr && wr.removeEventListener('scroll', handleVideosScroll)
  }, [handleVideosScroll])

  const prevVideo = () => setActiveIndex((i) => Math.max(0, i - 1))
  const nextVideo = () => setActiveIndex((i) => Math.min(eventHighlights.length - 1, i + 1))

  return (
    <>
      <Head>
        <title>Events | Masda Liverpool</title>
      </Head>
      <Header />

      <div className={styles.heroWrapper}>
        <div className={styles.heroSection}>
          <div className={styles.heroOverlay}>
            <h1 className={styles.heroTitle}>Masda Fight Nights</h1>
          </div>
        </div>
      </div>

      <main className={styles.mainContent}>
        {/* Upcoming Events */}
        <section className={styles.upcomingEvents}>
          <h2>Upcoming Events</h2>
          <div className={styles.eventsCarouselContainer}>
            {!isMobile && hasOverflow && (
              <button
                onClick={() => scrollEventsBy(-1)}
                disabled={!canScrollPrev}
                className={styles.arrowButton}
              >
                ‹
              </button>
            )}

            <div
              ref={eventsWrapperRef}
              className={styles.eventsCarouselWrapper}
            >
              {upcoming.map((event) => (
                <div key={event.id} className={styles.eventCard}>
                  <img
                    src={urlFor(event.image).width(600).url()}
                    alt={`${event.fighterA} vs. ${event.fighterB}`}
                    className={styles.eventImage}
                  />
                  <div className={styles.eventInfo}>
                    <h4 className={styles.eventFightTitle}>
                      {event.fightTitle}
                    </h4>
                    <p className={styles.eventLocation}>{event.location}</p>
                    <p className={styles.eventFighters}>
                      {event.fighterA}{' '}
                      <span className={styles.vs}>vs.</span> {event.fighterB}
                    </p>
                    <p className={styles.eventDate}>
                      {new Date(event.dateTime).toLocaleString()}
                    </p>
                    {event.link && (
                      <Link href={event.link} className={styles.eventButton}>
                        {event.buttonText || 'Learn More'}
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {!isMobile && hasOverflow && (
              <button
                onClick={() => scrollEventsBy(1)}
                disabled={!canScrollNext}
                className={styles.arrowButton}
              >
                ›
              </button>
            )}
          </div>
        </section>

        {/* Highlight Reel */}
        <section className={styles.eventHighlights}>
          <h2>Highlight Reel</h2>
          <div className={styles.eventsCarouselContainer}>
            {!isMobile && hasOverflow && (
              <button
                onClick={prevVideo}
                disabled={activeIndex === 0}
                className={styles.arrowButton}
              >
                ‹
              </button>
            )}

            <div
              ref={videoWrapperRef}
              className={styles.eventsCarouselWrapper}
            >
              {eventHighlights.map((video, idx) => (
                <div
                  key={video.id}
                  className={`${styles.videoCard} ${
                    idx === activeIndex ? styles.active : ''
                  }`}
                >
                  <video
                    ref={(el) => (videoRefs.current[idx] = el)}
                    src={video.url}
                    controls
                    preload="metadata"
                    muted
                    playsInline
                    webkit-playsinline="true"
                    onEnded={onVideoEnded}
                    className={styles.videoPlayer}
                  />
                </div>
              ))}
            </div>

            {!isMobile && hasOverflow && (
              <button
                onClick={nextVideo}
                disabled={activeIndex === eventHighlights.length - 1}
                className={styles.arrowButton}
              >
                ›
              </button>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
