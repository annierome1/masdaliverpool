// pages/index.js
import Head from 'next/head'
import { useState, useRef, useEffect } from 'react'
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

  try {
    const res = await fetch(
      `https://api.mux.com/video/v1/assets/${process.env.ASSET_ID}`,
      { headers: { Authorization: `Basic ${auth}` } }
    )
    
    if (!res.ok) {
      throw new Error(`Mux API error: ${res.status}`)
    }
    
    const { data: asset } = await res.json()
    
    if (!asset?.playback_ids?.[0]?.id) {
      throw new Error('No playback ID found in asset')
    }
    
    return {
      props: { homepagePlaybackId: asset.playback_ids[0].id },
      revalidate: 60,
    }
  } catch (error) {
    console.error('Error fetching Mux asset:', error)
    return {
      props: { homepagePlaybackId: null },
      revalidate: 60,
    }
  }
}

export default function Home({ homepagePlaybackId }) {
  const playerRef = useRef(null)

  const [showVideo, setShowVideo] = useState(false)



  // Video fade-in after a short delay
  useEffect(() => {
    const t = setTimeout(() => setShowVideo(true), 1000)
    return () => clearTimeout(t)
  }, [])

  // Auto-play when visible
  useEffect(() => {
    if (showVideo && playerRef.current) {
      const player = playerRef.current
      
      // Wait for video to be ready before playing
      const handleCanPlay = () => {
        if (player && typeof player.play === 'function') {
          player.play().catch((err) => {
            console.warn('Video play failed:', err)
          })
        }
      }
      
      // Handle errors gracefully
      const handleError = (e) => {
        console.error('Video error:', e)
        // Try to recover by reloading the video
        if (player && typeof player.load === 'function') {
          setTimeout(() => {
            try {
              player.load()
            } catch (err) {
              console.warn('Video reload failed:', err)
            }
          }, 1000)
        }
      }
      
      // Check if video is already ready, or wait for canplay event
      const videoElement = player.video || player
      if (videoElement && videoElement.readyState >= 2) {
        // Video is already loaded enough to play
        handleCanPlay()
      } else {
        // Wait for the video to be ready
        player.addEventListener('canplay', handleCanPlay, { once: true })
        player.addEventListener('error', handleError, { once: true })
      }
      
      return () => {
        player.removeEventListener('canplay', handleCanPlay)
        player.removeEventListener('error', handleError)
      }
    }
  }, [showVideo])

  // Spacebar toggles play/pause
  useEffect(() => {
    const onKey = (e) => {
      if (e.code === 'Space') {
        e.preventDefault()
        const p = playerRef.current
        if (p && p.paused) p.play().catch(() => {})
        else if (p) p.pause()
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
        <div className={styles.videoCropper}>
          {homepagePlaybackId && (
            <mux-player
              ref={playerRef}
              className={`${styles.videoBg} ${
                showVideo ? styles.videoVisible : ''
              }`}
              playback-id={homepagePlaybackId}
              stream-type="on-demand"
              autoplay
              loop
              muted
              playsinline
              preload="auto"
              controls={false}
            />
          )}
        </div>

        <div className={styles.overlay} />
        <div className={styles.content}>
          <h1>MASDA GYM LIVERPOOL</h1>
          <p>Where champions are made and lives are changed</p>
          <div className={styles.deskButton}>
            <Link href="/team" className={buttonStyles.rbutton}>Meet the team</Link>
            <Link href="/coaches" className={buttonStyles.rbutton}>Meet the coaches</Link>
          </div>
        </div>
      </main>

      {/* About Us Section */}
      <section className={styles.aboutSection}>
        <div className={styles.aboutContainer}>
          <h2 className={styles.aboutTitle}>About Us</h2>
          <p className={styles.aboutText}>
            MASDA Gym, established in 2010, is a world-class combat sports academy
            located in Liverpool, UK. Renowned for training amateur and
            professional fighters in Muay Thai, MMA, and Boxing, as well as
            providing expert-led strength & conditioning programs.
          </p>
          <p className={styles.aboutText}>
            MASDA boasts top-tier facilities including multiple boxing rings,
            expansive mat space, and an onsite therapy clinic. With a legacy of
            producing champions on the world’s biggest combat stages, MASDA
            fosters a welcoming, family-like community for all skill levels.
          </p>
          <p className={styles.aboutText}>
            In 2024, MASDA Gym Liverpool was proudly awarded{' '}
            <strong>UK Gym of the Year</strong> by Thai Fighter UK,
            recognizing its outstanding contributions to Muay Thai and martial
            arts excellence.
          </p>
        </div>
      </section>

      <Footer />
    </>
  )
}
