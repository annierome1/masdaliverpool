import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useEffect, useRef, useState } from 'react'
import styles from '../styles/components/fightnight.module.css'
import AWS from 'aws-sdk'
import { client, urlFor } from '../lib/sanity'

// Server-side function to fetch event data and videos
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


  // Configure AWS SDK
  const s3 = new AWS.S3({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  })

  const Bucket = process.env.AWS_S3_BUCKET_NAME
  const Folder = 'videos/fightnight/'

  // Fetch video files from the specified S3 folder
  const { Contents } = await s3
    .listObjectsV2({
      Bucket,
      Prefix: Folder,
    })
    .promise()

  // Filter for video files and construct full URLs
  const eventHighlights = Contents
    .filter((file) => file.Key.endsWith('.mp4') || file.Key.endsWith('.mov'))
    .map((file, i) => ({
      id: `video-${i}`,
      url: `https://${Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.Key}`,
    }))

    return {
    props: {
      eventsData: { upcoming },
      eventHighlights,
    },
    revalidate: 60,
  }
}

// Main page component
export default function EventsPage({ eventsData, eventHighlights }) {
  const { upcoming } = eventsData
  const videoRefs = useRef([])
  const wrapperRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [activeEvent, setActiveEvent] = useState(0)
  const eventRefs = useRef([])          // no generics, just an array

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

   // Scroll the active card into view
  useEffect(() => {
    const el = eventRefs.current[activeEvent]
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', inline: 'center' })
    }
  }, [activeEvent])

  const prevEvent = () => setActiveEvent(i => Math.max(0, i - 1))
  const nextEvent = () =>
    setActiveEvent(i => Math.min(upcoming.length - 1, i + 1))

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
        {/* Upcoming Events Carousel */}
        <section className={styles.upcomingEvents}>
          <h2>Upcoming Events</h2>
          <div className={styles.eventsCarouselContainer}>
            <button
              onClick={prevEvent}
              disabled={activeEvent === 0}
              className={styles.arrowButton}
            >
              &lsaquo;
            </button>

            <div
              ref={wrapperRef}
              className={styles.eventsCarouselWrapper}
            >
              {upcoming.map((event, idx) => (
                <div
                  key={event.id}
                  ref={el => { eventRefs.current[idx] = el }}
                  className={`
                    ${styles.eventCard}
                    ${idx === activeEvent ? styles.activeEvent : ''}
                  `}
                  onClick={() => setActiveEvent(idx)}
                >
                  <img
                    src={urlFor(event.image).width(600).url()}
                    alt={`${event.fighterA} vs. ${event.fighterB}`}
                    className={styles.eventImage}
                  />
                  <div className={styles.eventInfo}>
                    <h4 className={styles.eventFightTitle}>
                      {event.fightTitle}
                    </h4>
                    <p className={styles.eventLocation}>
                      {event.location}
                    </p>
                    <p className={styles.eventFighters}>
                      {event.fighterA}{' '}
                      <span className={styles.vs}>vs.</span>{' '}
                      {event.fighterB}
                    </p>
                    <p className={styles.eventDate}>
                      {new Date(event.dateTime).toLocaleString([], {
                        month: 'numeric',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                    {event.link && (
                      <Link
                        href={event.link}
                        className={styles.eventButton}
                      >
                        {event.buttonText || 'Learn More'}
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={nextEvent}
              disabled={activeEvent === upcoming.length - 1}
              className={styles.arrowButton}
            >
              &rsaquo;
            </button>
          </div>
        </section>

        {/* Highlight Reel */}
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
                    <video
                      ref={(el) => (videoRefs.current[index] = el)}
                      src={highlight.url}
                      controls
                      preload="metadata"
                      muted
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
  )
}
