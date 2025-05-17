// pages/events.js
import fs from 'fs';
import path from 'path';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useEffect, useRef } from 'react';
import styles from '../styles/components/fightnight.module.css';

// Load upcoming events at build time
export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'public', 'data', 'events.json');
  const raw = fs.readFileSync(filePath, 'utf8');
  const eventsData = JSON.parse(raw);
  return { props: { eventsData } };
}

// Static highlights
const eventHighlights = [
  {
    id: 'highlight1',
    title: 'Winter War 2025 Highlights',
    videoSrc: '/videos/highlight1.mp4',
    thumbnail: '/videos/thumbnails/winter-war-2025.jpg',
  },
];

export default function EventsPage({ eventsData }) {
  const videoRefs = useRef({});

  useEffect(() => {
    const observers = [];
    Object.entries(videoRefs.current).forEach(([id, video]) => {
      if (!video) return;
      video.pause();
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            video.play();
          } else {
            video.pause();
          }
        },
        { threshold: 0.5 }
      );
      observer.observe(video);
      observers.push(observer);
    });
    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

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
                  <a href={event.link} className={styles.eventButton}>
                    {event.buttonText}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Event Highlights (autoplay on scroll) */}
        <section className={styles.eventHighlights}>
          <h2>Event Highlights</h2>
          <div className={styles.videosGrid}>
            {eventHighlights.map(({ id, title, videoSrc, thumbnail }) => (
              <div key={id} className={styles.videoCard}>
                <video
                  ref={(el) => (videoRefs.current[id] = el)}
                  src={videoSrc}
                  poster={thumbnail}
                  controls
                  preload="metadata"
                  className={styles.videoPlayer}
                />
                <h3>{title}</h3>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
