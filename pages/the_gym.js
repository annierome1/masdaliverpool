// pages/thegym.js
import '@mux/mux-player'                  // register the web component
import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import React, { useEffect, useRef, useState } from 'react'
import styles from '../styles/components/gym.module.css'


export async function getStaticProps() {
  // 1) Either read from an env var, or hard-code your list:
  const ASSET_IDS = [
        'slNSLju6YFQUrh019BadGqmq5ZcQZIugLRLUJilmUt300',
        'sIK02GZv4y3IzniD7tgQnFvt02rmh5GSjsohjRwPM00DKg',
        'EKoDKeX93015Yz2kVAXPc79vpB5u4IsvH7KKRMLDdvGk',
        'hUZ9j63tBx902zfab6CeDiQmDlh014CPOv00HxmwbzvG2g',
        'cdE8f2ePjFpH00OlYasnegJaFUl9uS019zYfchd1oioHE',

      ];

 
  // 2) Build your Basic Auth header
  const auth = Buffer.from(
    `${process.env.MUX_TOKEN_ID}:${process.env.MUX_TOKEN_SECRET}`
  ).toString('base64')
// 3) Fetch each asset’s public playback ID
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

  // once mounted, mark videos ready and start playback
  useEffect(() => {
    setReady(true)
    playersRef.current.forEach((p) => p?.play().catch(() => {}))
  }, [])

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
          {gymPlaybackIds.map((pid, idx) => (
            <mux-player
              key={pid}
              ref={(el) => (playersRef.current[idx] = el)}
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
        {/* Facility Section */}
        <section className={styles.facilitySection}>
          <h2>Our World-Class Facility</h2>
          <div className={styles.facilityGrid}>
            {/* Card 1 */}
            <div className={styles.facilityCard}>
              <div className={styles.cardImageWrapper}>
              <img
                src="/thegym/masda_mat.jpg"
                alt="Spacious Arena"
                className={styles.cardImage}
              />
              </div>
              <h3>Spacious Arena</h3>
              <p>
                Ample space to train, spar, and hone your skills.
              </p>
            </div>

            {/* Card 2 */}
            <div className={styles.facilityCard}>
              <div className={styles.cardImageWrapper}>
              <img
                src="/thegym/gym_machines.jpg"
                alt="Modern Amenities"
                className={styles.cardImage}
              />
              </div>
              <h3>Modern Amenities</h3>
              <p>
                Fully equipped locker rooms, showers, and relaxation areas.
              </p>
            </div>

            {/* Card 3 */}
            <div className={styles.facilityCard}>
              <div className={styles.cardImageWrapper}>
              <img
                src="/thegym/clinic.png"
                alt="Concordia Clinic"
                 style={{
                  width: '300px',
                  height: 'auto',
                  objectFit: 'contain',
                  marginBottom: '3rem',
                  marginTop: '4rem'
                }}
              />
              </div>
              <h3>Therapy Clinic & Recover Center</h3>
              <p>
              The Clinic aims to help and guide those looking for better health and wellbeing, and we have a broad range of treatment options to assist in most conditions.
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA Section 
        <section className={styles.ctaSection}>
          <h2>Ready to Start Training?</h2>
        </section>
        */}
      </main>
      <Footer />
    </>
  );
}
