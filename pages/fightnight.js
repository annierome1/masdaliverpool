// pages/events.js
import fs from 'fs';
import path from 'path';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useEffect, useRef, useState } from 'react';
import styles from '../styles/components/fightnight.module.css';
import Mux from '@mux/mux-node';
import '@mux/mux-player';


export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'public', 'data', 'events.json');
  const raw = fs.readFileSync(filePath, 'utf8');
  const eventsData = JSON.parse(raw);

  // ─── new: fetch your top-4 highlight assets from Mux ─────────
 const mux = new Mux({
      tokenId: process.env.MUX_TOKEN_ID,
    tokenSecret: process.env.MUX_TOKEN_SECRET,
  });
  // grab your latest 4 assets (you can filter/tag however you like)
  const assets = await mux.video.assets.list({ limit: 4 });
  
  const eventHighlights = assets.data.map((asset) => ({
    id: asset.id,
    // pick the first public playback ID
    playbackId: asset.playback_ids[0].id,
  }));

  return {
    props: {
      eventsData,
      eventHighlights,
    },
  };
}






export default function EventsPage({ eventsData, eventHighlights }) {
  const videoRefs = useRef([])
  const wrapperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

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

    const prev = () => setActiveIndex((i) => Math.max(0, i - 1));
  const next = () => setActiveIndex((i) => Math.min(eventHighlights.length - 1, i + 1));



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

        {/* Event Highlights (autoplay on scroll) */}
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
                    {/* just swapped in your Mux HLS URL here */}
                    <mux-player
                      ref={(el) => (videoRefs.current[index] = el)}
                      src={`https://stream.mux.com/${highlight.playbackId}.m3u8`}
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
  );
}
