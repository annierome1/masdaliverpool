// pages/index.js
import Head from 'next/head'
import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import styles from '../styles/components/home.module.css'
import buttonStyles from '../styles/components/buttons.module.scss'
import '@mux/mux-player'              
import Mux from '@mux/mux-node'

export async function getStaticProps() {
  // build a Basic Auth header
  const auth = Buffer.from(
    `${process.env.MUX_TOKEN_ID}:${process.env.MUX_TOKEN_SECRET}`
  ).toString('base64')

  // call the Mux Assets API directly
  const res = await fetch(
    `https://api.mux.com/video/v1/assets/${process.env.ASSET_ID}`,
    { headers: { Authorization: `Basic ${auth}` } }
  )
  const { data: asset } = await res.json()
  const homepagePlaybackId = asset.playback_ids[0].id

  return {
    props: { homepagePlaybackId },
    revalidate: 60,
  }
}
export default function Home({ homepagePlaybackId }) {
  const playerRef = useRef(null)

  useEffect(() => {
    const player = playerRef.current
    if (player) {
      // ensure the player starts immediately
      player.autoplay = true
      player.play().catch(() => {
        /* play might be blocked until user gesture; error is expected */
      })
    }

    const handleKey = (e) => {
      if (e.code === 'Space') {
        e.preventDefault()
        if (player) {
          if (player.paused) player.play()
          else player.pause()
        }
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
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
          class={styles.videoBg}
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
