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

  // Events carousel
  const eventsWrapperRef = useRef(null)
  const eventCardRefs = useRef([])

  // Video carousel
  const videoWrapperRef = useRef(null)
  const videoRefs = useRef([])

  const [isMobile, setIsMobile] = useState(false)
  const [hasEventOverflow, setHasEventOverflow] = useState(false)
  const [activeEventIndex, setActiveEventIndex] = useState(0)

  const [activeVideoIndex, setActiveVideoIndex] = useState(0)


  // Handle mobile/desktop and overflow checks
  useEffect(() => {
    const recalc = () => {
      setIsMobile(window.innerWidth < 768)

      // Events
      const eventsEl = eventsWrapperRef.current
      setHasEventOverflow(eventsEl ? eventsEl.scrollWidth > eventsEl.clientWidth : false)

    }
    recalc()
    window.addEventListener('resize', recalc)
    return () => window.removeEventListener('resize', recalc)
  }, [])

  // EVENTS: Scroll to active event card when activeEventIndex changes
  useEffect(() => {
    const card = eventCardRefs.current[activeEventIndex]
    if (card) card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }, [activeEventIndex, upcoming])

  // EVENTS: Arrows
  const prevEvent = () => setActiveEventIndex(i => Math.max(0, i - 1))
  const nextEvent = () => setActiveEventIndex(i => Math.min(upcoming.length - 1, i + 1))

  // VIDEOS: Play/pause logic
  useEffect(() => {
    videoRefs.current.forEach((vid, idx) => {
      if (!vid) return
      if (idx === activeVideoIndex) vid.play().catch(() => {})
      else {
        vid.pause()
        vid.currentTime = 0
      }
    })
  }, [activeVideoIndex])

  // VIDEOS: Scroll to active video card on desktop
  useEffect(() => {
    if (isMobile) return
    const wr = videoWrapperRef.current
    if (!wr) return
    const card = wr.children[activeVideoIndex]
    if (card) card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }, [activeVideoIndex, isMobile])

  // VIDEOS: Snap to closest video on mobile scroll
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
    setActiveVideoIndex(closest)
  }, [isMobile])

  useEffect(() => {
    const wr = videoWrapperRef.current
    if (wr) wr.addEventListener('scroll', handleVideosScroll, { passive: true })
    return () => wr && wr.removeEventListener('scroll', handleVideosScroll)
  }, [handleVideosScroll])

  // VIDEOS: Arrows
  const prevVideo = () => setActiveVideoIndex(i => Math.max(0, i - 1))
  const nextVideo = () => setActiveVideoIndex(i => Math.min(eventHighlights.length - 1, i + 1))
  const onVideoEnded = () => {
    if (!isMobile) return
    setActiveVideoIndex(i => Math.min(eventHighlights.length - 1, i + 1))
  }

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
            <p>There is no tomorrow</p>

          </div>
        </div>
      </div>

      <main className={styles.mainContent}>
        {/* Upcoming Events */}
        <section className={styles.upcomingEvents}>
          <h2>Upcoming Events</h2>
          <div className={styles.eventsCarouselContainer}>
            {!isMobile && hasEventOverflow && (
              <button
                onClick={prevEvent}
                disabled={activeEventIndex === 0}
                className={styles.arrowButton}
              >
                ‹
              </button>
            )}

            <div
              ref={eventsWrapperRef}
              className={styles.eventsCarouselWrapper}
            >
              {upcoming.map((event, idx) => (
                <div
                  key={event.id}
                  ref={el => eventCardRefs.current[idx] = el}
                  className={`${styles.eventCard} ${idx === activeEventIndex ? styles.active : ''}`}
                >
                  <img
                    src={urlFor(event.image).width(600).url()}
                    alt={`${event.fighterA} vs. ${event.fighterB}`}
                    className={styles.eventImage}
                  />
                  <div className={styles.eventInfo}>
                    <h4 className={styles.eventFightTitle}>{event.fightTitle}</h4>
                    <p className={styles.eventLocation}>{event.location}</p>
                    <p className={styles.eventFighters}>
                      {event.fighterA} <span className={styles.vs}>vs.</span> {event.fighterB}
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

            {!isMobile && hasEventOverflow && (
              <button
                onClick={nextEvent}
                disabled={activeEventIndex === upcoming.length - 1}
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
            {!isMobile &&  (
              <button
                onClick={prevVideo}
                disabled={activeVideoIndex === 0}
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
                  className={`${styles.videoCard} ${idx === activeVideoIndex ? styles.active : ''}`}
                >
                  <video
                    ref={el => (videoRefs.current[idx] = el)}
                    src={video.url}
                    controls
                    preload="metadata"
                    muted
                    playsInline
                    onEnded={onVideoEnded}
                    className={styles.videoPlayer}
                  />
                </div>
              ))}
            </div>

            {!isMobile &&  (
              <button
                onClick={nextVideo}
                disabled={activeVideoIndex === eventHighlights.length - 1}
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
