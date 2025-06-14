// pages/thegym.js
import '@mux/mux-player'            
import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import React, { useEffect, useRef, useState } from 'react'
import styles from '../styles/components/gym.module.css'


export async function getStaticProps() {

  const ASSET_IDS = [
        'slNSLju6YFQUrh019BadGqmq5ZcQZIugLRLUJilmUt300',
        'sIK02GZv4y3IzniD7tgQnFvt02rmh5GSjsohjRwPM00DKg',
        'hUZ9j63tBx902zfab6CeDiQmDlh014CPOv00HxmwbzvG2g',
        'cdE8f2ePjFpH00OlYasnegJaFUl9uS019zYfchd1oioHE',
        'EKoDKeX93015Yz2kVAXPc79vpB5u4IsvH7KKRMLDdvGk',

      ];

 

  const auth = Buffer.from(
    `${process.env.MUX_TOKEN_ID}:${process.env.MUX_TOKEN_SECRET}`
  ).toString('base64')

  const gymPlaybackIds = await Promise.all(
    ASSET_IDS.map(async (assetId) => {
      const res = await fetch(
        `https://api.mux.com/video/v1/assets/${assetId}`,
        {
          headers: {
            Authorization: `Basic ${auth}`,
            'Content-Type': 'application/json',
          },
        }
      )
      if (!res.ok) return null
      const { data: asset } = await res.json()
      const pub = Array.isArray(asset.playback_ids)
        ? asset.playback_ids.find((p) => p.policy === 'public')
        : null
      return pub?.id ?? null
    })
  ).then((ids) => ids.filter(Boolean)) // drop any nulls

  return {
    props: { gymPlaybackIds },
    revalidate: 60,
  }
}

export default function TheGymPage({ gymPlaybackIds }) {
  const playersRef = useRef([])
  const [ready, setReady] = useState(false)

  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // once mounted, mark videos ready and start playback
  useEffect(() => {
    setReady(true)
    playersRef.current.forEach((p) => p?.play().catch(() => {}))
  }, [])

  const vidsToShow = isMobile
    ? gymPlaybackIds.slice(0, 4)
    : gymPlaybackIds

  return (
    <>
      <Head>
        <title>The Gym | Masda Liverpool</title>
        <meta
          name="description"
          content="Explore our state-of-the-art facility designed for fighters of all levels."
        />
      </Head>

      <Header />

      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div className={styles.videoContainer}>
          {vidsToShow.map((pid, idx) => (
            <mux-player
              key={pid}
              ref={el => (playersRef.current[idx] = el)}
              className={`${styles.videoBg} ${ready ? styles.videoVisible : ''}`}
              playback-id={pid}
              stream-type="on-demand"
              autoplay
              loop
              muted
              playsinline
              controls={false}
              preload="metadata"
            />
          ))}
        </div>

        <div className={styles.heroOverlay}>
          <h1 className={styles.heroTitle}>
            Welcome to Our World-Class Facility
          </h1>
          <p className={styles.heroSubtitle}>
            Experience training in a state-of-the-art facility designed for fighters of all levels.
          </p>
          <Link href="/classes" className={styles.ctaButton}>
            Start Your Journey
          </Link>
        </div>
      </div>
      <main className={styles.mainContent}>
  {/* Facilities */}
  <section className={styles.section}>
    <h2 className={styles.sectionTitle}>Facilities</h2>
    <div className={styles.twoColumn}>
      <ul className={styles.bulletList}>
        <li><strong>3000 ft²</strong> of training mat</li>
        <li><strong>3</strong> boxing rings</li>
        <li>Male & female changing areas</li>
        <li>Private shower & wet room</li>
        <li><strong>10</strong> bag stations</li>
        <li>Cardio & free weights area</li>
      </ul>
      <img
        src="/thegym/gym_machines.jpg"
        alt="Training Mat Area"
        className={styles.sectionImage}
      />
    </div>
  </section>

  {/* Services */}
  <section className={styles.sectionAlt}>
    <h2 className={styles.sectionTitle}>Services</h2>
    <div className={styles.twoColumnReverse}>
      <ul className={styles.bulletList}>
        <li>Daily scheduled classes (AM & PM)</li>
        <li>Children's classes (age 5+)</li>
        <li>Private lessons (1-on-1 or small group)</li>
        <li>Muay Thai, MMA, Boxing, Kickboxing</li>
        <li>Brazilian Jiu Jitsu & Grappling</li>
        <li>Fitness & Conditioning</li>
      </ul>
      <img
        src="/thegym/masda_mat.jpg"
        alt="Training Equipment"
        className={styles.sectionImage}
      />
    </div>
  </section>

  {/* Therapy Clinic */}
  <section className={styles.section}>
    <h2 className={styles.sectionTitle}>Therapy Clinic & Recovery</h2>
    <div className={styles.twoColumn}>
      <p className={styles.paragraph}>
        The clinic supports your health journey with a range of recovery treatments for physical therapy, injury prevention, and holistic wellbeing.
      </p>
      <img
        src="/thegym/clinic.png"
        alt="Clinic"
        className={styles.sectionImage}
      />
    </div>
  </section>

  {/* Coaches */}
  <section className={styles.sectionAlt}>
    <h2 className={styles.sectionTitle}>Our Coaches</h2>
    <p className={styles.paragraphCenter}>
      Whether you're a beginner or a seasoned fighter, our coaches bring diverse expertise to meet your goals—Muay Thai, BJJ, MMA, and more.
    </p>
  </section>
</main>


      <Footer />
    </>
  );
}
