import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useRef, useState, useEffect, useCallback } from 'react';
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
  `);

  const s3 = new AWS.S3({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  });
  const Bucket = process.env.AWS_S3_BUCKET_NAME;
  const Folder = 'videos/fightnight/';
  const { Contents } = await s3.listObjectsV2({ Bucket, Prefix: Folder }).promise();
  const eventHighlights = Contents.filter(file => file.Key.match(/\.(mp4|mov)$/)).map((file, i) => ({
    id: `video-${i}`,
    url: `https://${Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.Key}`
  }));

  return { props: { eventsData: { upcoming }, eventHighlights }, revalidate: 60 };
}

export default function EventsPage({ eventsData, eventHighlights }) {
  const { upcoming } = eventsData;
  const videoRefs = useRef([]);
  const eventsWrapperRef = useRef(null);
  const videoWrapperRef = useRef(null);

  const [isMobile, setIsMobile] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [pagesCount, setPagesCount] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);
  const onVideoEnded = () => {
    if (!isMobile) return; 
    setActiveIndex(i => Math.min(eventHighlights.length - 1, i + 1));
  }

  // detect mobile and overflow & pages count
  useEffect(() => {
    const calculate = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      const el = eventsWrapperRef.current;
      if (el) {
        const overflow = el.scrollWidth > el.clientWidth;
        setHasOverflow(overflow);
        const count = Math.ceil(el.scrollWidth / el.clientWidth);
        setPagesCount(count);
        setPageIndex(prev => Math.min(prev, count - 1));
      }
    };
    calculate();
    window.addEventListener('resize', calculate);
    return () => window.removeEventListener('resize', calculate);
  }, []);
    // play/pause active highlight reel video
    useEffect(() => {
      videoRefs.current.forEach((video, idx) => {
        if (!video) return;
        if (idx === activeIndex) {
          video.play().catch(() => {});
        } else {
          video.pause();
          video.currentTime = 0;
        }
      });
    }, [activeIndex]);



  // manual video scroll sync for mobile
  const handleVideosScroll = useCallback(() => {
    if (!isMobile) return;
    const wr = videoWrapperRef.current;
    if (!wr) return;
    const { scrollLeft, children } = wr;
    let closest = 0;
    let minDiff = Infinity;
    Array.from(children).forEach((child, idx) => {
      const diff = Math.abs(child.offsetLeft - scrollLeft);
      if (diff < minDiff) { minDiff = diff; closest = idx; }
    });
    setActiveIndex(closest);
  }, [isMobile]);

  useEffect(() => {
    const wr = videoWrapperRef.current;
    if (wr) wr.addEventListener('scroll', handleVideosScroll, { passive: true });
    return () => wr && wr.removeEventListener('scroll', handleVideosScroll);
  }, [handleVideosScroll]);

  const prevPage = () => setPageIndex(i => Math.max(0, i - 1));
  const nextPage = () => setPageIndex(i => Math.min(pagesCount - 1, i + 1));
  const prevVideo = () => setActiveIndex(i => Math.max(0, i - 1));
  const nextVideo = () => setActiveIndex(i => Math.min(eventHighlights.length - 1, i + 1));

  return (
    <>
      <Head><title>Events | Masda Liverpool</title></Head>
      <Header />
      <div className={styles.heroWrapper}>
        <div className={styles.heroSection}>
          <div className={styles.heroOverlay}>
            <h1 className={styles.heroTitle}>Masda Fight Nights</h1>
          </div>
        </div>
      </div>
      <main className={styles.mainContent}>
        <section className={styles.upcomingEvents}>
          <h2>Upcoming Events</h2>
          <div className={styles.eventsCarouselContainer}>
            {!isMobile && hasOverflow && (
              <button onClick={prevPage} disabled={pageIndex === 0} className={styles.arrowButton}>‹</button>
            )}
            <div ref={eventsWrapperRef} className={styles.eventsCarouselWrapper}>
              {upcoming.map(event => (
                <div
                  key={event.id}
                  className={styles.eventCard}
                  onMouseEnter={() => !isMobile && setPageIndex(pageIndex)}
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
                    <p className={styles.eventDate}>{new Date(event.dateTime).toLocaleString()}</p>
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
              <button onClick={nextPage} disabled={pageIndex === pagesCount - 1} className={styles.arrowButton}>›</button>
            )}
          </div>
          <div className={styles.pagination}>
            {Array.from({ length: pagesCount }).map((_, i) => (
              <button key={i} className={i === pageIndex ? styles.activeDot : ''} onClick={() => setPageIndex(i)} />
            ))}
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
          <div ref={videoWrapperRef} className={styles.eventsCarouselWrapper}>
            {eventHighlights.map((video, idx) => (
            <div key={video.id} className={`${styles.videoCard} ${idx === activeIndex ? styles.active : ''}`}>
              <div className={styles.videoWrapper}>
                <video
                  ref={el => (videoRefs.current[idx] = el)}
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
        <div className={styles.pagination}>
          {eventHighlights.map((_, i) => (
            <button
              key={i}
              className={i === activeIndex ? styles.activeDot : ''}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      </section>

      </main>
      <Footer />
    </>
  );
}
