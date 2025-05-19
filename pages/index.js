// pages/index.js
import Head from 'next/head'
import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import styles from '../styles/components/home.module.css'
import buttonStyles from '../styles/components/buttons.module.scss'
import '@mux/mux-player'              


export async function getStaticProps() {
  const auth = Buffer.from(
    `${process.env.MUX_TOKEN_ID}:${process.env.MUX_TOKEN_SECRET}`
  ).toString('base64')

  const res = await fetch(
    `https://api.mux.com/video/v1/assets/${process.env.ASSET_ID}`,
    { headers: { Authorization: `Basic ${auth}` } }
  )
  const { data: asset } = await res.json()
  return {
    props: { homepagePlaybackId: asset.playback_ids[0].id },
    revalidate: 60,
  }
}

export default function Home({ homepagePlaybackId }) {
  const playerRef = useRef(null)
  const [showVideo, setShowVideo] = useState(false)

  // after 1 second, reveal the video
  useEffect(() => {
    const t = setTimeout(() => setShowVideo(true), 400)
    return () => clearTimeout(t)
  }, [])

  // when it’s time to show it, start playback
  useEffect(() => {
    if (showVideo && playerRef.current) {
      playerRef.current.play().catch(() => {})
    }
  }, [showVideo])

  // space bar toggles play/pause
  useEffect(() => {
    const onKey = (e) => {
      if (e.code === 'Space') {
        e.preventDefault()
        const p = playerRef.current
        if (p) p.paused ? p.play() : p.pause()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
  return (
    <>
      <Head>
        <title>MASDA LIVERPOOL</title>
        <meta
          name="description"
          content="Train hard, fight smart, and elevate at Masda Liverpool."
        />
      </Head>

      <Header />

      <main className={styles.main}>
        {/* video background */}
          <mux-player
            ref={playerRef}
            className={`${styles.videoBg} ${showVideo ? styles.videoVisible : ''}`}
            playback-id={homepagePlaybackId}
            stream-type="on-demand"
            autoplay
            loop
            muted
            playsinline
          />

        <div className={styles.overlay} />
        {/* your content goes on top */}
        <div className={styles.content}>
          <h1>MASDA GYM LIVERPOOL</h1>
          <p>Train Hard. Fight Smart. Elevate.</p>
          <Link href="/team" className={buttonStyles.rbutton}>
            Meet the team
          </Link>
        </div>
      </main>

      <Footer />
    </>
  )
}
