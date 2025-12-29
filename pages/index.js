// pages/index.js
import Head from 'next/head'
import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import styles from '../styles/components/home.module.css'
import buttonStyles from '../styles/components/buttons.module.scss'
export async function getStaticProps() {
  return {
    props: {
      heroVideoUrl: process.env.HERO_VIDEO_URL ?? null,
      heroPosterUrl: process.env.HERO_POSTER_URL ?? null,
    },
    revalidate: 60,
  }
}

export default function Home({ heroVideoUrl, heroPosterUrl }) {
  const playerRef = useRef(null)
  const [showVideo, setShowVideo] = useState(false)
  const [videoFailed, setVideoFailed] = useState(false)
  const [hasTriedPlay, setHasTriedPlay] = useState(false)

  // Video fade-in after a short delay
  useEffect(() => {
    const t = setTimeout(() => setShowVideo(true), 1000)
    return () => clearTimeout(t)
  }, [])

  // Reset when video URL changes
  useEffect(() => {
    setVideoFailed(false)
    setHasTriedPlay(false)
  }, [heroVideoUrl])

  // Auto-play when visible
  useEffect(() => {
    if (!showVideo || videoFailed || hasTriedPlay) return
    const el = playerRef.current
    if (!el) return

    const attemptPlay = () => {
      const playPromise = el.play()
      if (playPromise && typeof playPromise.then === 'function') {
        playPromise
          .then(() => setHasTriedPlay(true))
          .catch(() => {
            setVideoFailed(true)
          })
      } else {
        setHasTriedPlay(true)
      }
    }
    attemptPlay()
  }, [showVideo, videoFailed, hasTriedPlay])

  // Handle playback errors
  useEffect(() => {
    const el = playerRef.current
    if (!el) return

    const onError = () => {
      setVideoFailed(true)
    }

    el.addEventListener('error', onError)
    return () => el.removeEventListener('error', onError)
  }, [])

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

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://masdaliverpool.com'

  return (
    <>
      <Head>
        <title>MASDA LIVERPOOL</title>
        <meta
          name="description"
          content="Train hard, fight smart, and elevate at Masda Liverpool."
        />
        
        {/* Open Graph */}
        <meta property="og:title" content="MASDA Gym Liverpool - World-Class Combat Sports Academy" />
        <meta property="og:description" content="World-class combat sports academy in Liverpool, UK. Training amateur and professional fighters in Muay Thai, MMA, and Boxing. UK Gym of the Year 2024." />
        <meta property="og:image" content={`${baseUrl}/masda_logo_color_wt.png`} />
        <meta property="og:url" content={baseUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="MASDA Liverpool" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="MASDA Gym Liverpool - World-Class Combat Sports Academy" />
        <meta name="twitter:description" content="World-class combat sports academy in Liverpool, UK. Training amateur and professional fighters in Muay Thai, MMA, and Boxing." />
        <meta name="twitter:image" content={`${baseUrl}/masda_logo_color_wt.png`} />
      </Head>
      <Header />

      <main className={styles.main}>
        <div className={styles.videoCropper}>
          {heroVideoUrl && !videoFailed ? (
            <video
              ref={playerRef}
              className={`${styles.videoBg} ${
                showVideo ? styles.videoVisible : ''
              }`}
              src={heroVideoUrl}
              poster={heroPosterUrl || undefined}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
            />
          ) : (
            <div
              className={`${styles.videoBg} ${styles.videoVisible}`}
              style={{
                background: '#000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100%',
                width: '100%',
                height: '100%',
              }}
            >
              <Image
                src="/masda_logo.png"
                alt="MASDA Gym"
                width={400}
                height={400}
                style={{
                  maxWidth: '60%',
                  maxHeight: '60%',
                  width: 'auto',
                  height: 'auto',
                  objectFit: 'contain',
                }}
              />
            </div>
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

