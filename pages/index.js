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
    
    const playbackId = asset.playback_ids[0].id
    // Generate thumbnail URL from Mux
    const thumbnailUrl = `https://image.mux.com/${playbackId}/thumbnail.jpg?time=1`
    
    return {
      props: { 
        homepagePlaybackId: playbackId,
        thumbnailUrl: thumbnailUrl,
      },
      revalidate: 60,
    }
  } catch (error) {
    console.error('Error fetching Mux asset:', error)
    return {
      props: { 
        homepagePlaybackId: null,
        thumbnailUrl: null,
      },
      revalidate: 60,
    }
  }
}

export default function Home({ homepagePlaybackId, thumbnailUrl }) {
  const playerRef = useRef(null)
  const [showVideo, setShowVideo] = useState(false)
  const [videoFailed, setVideoFailed] = useState(false)
  const [retryCount, setRetryCount] = useState(0)



  // Video fade-in after a short delay
  useEffect(() => {
    const t = setTimeout(() => setShowVideo(true), 1000)
    return () => clearTimeout(t)
  }, [])

  // Reset retry count when playback ID changes
  useEffect(() => {
    setRetryCount(0)
    setVideoFailed(false)
  }, [homepagePlaybackId])

  // Retry on decode errors with exponential backoff
  useEffect(() => {
    const el = playerRef.current
    if (!el || !homepagePlaybackId || videoFailed) return

    const onError = (e) => {
      console.error('Video error:', e)
      
      // Check if it's a decode error (multiple ways to detect)
      const error = e.detail?.error || e.target?.error
      const errorCode = error?.code
      const errorMessage = error?.message || ''
      
      const isDecodeError = 
        errorCode === -12909 || // macOS Safari decode error
        errorCode === 4 || // MEDIA_ERR_DECODE
        errorMessage.toLowerCase().includes('decode') ||
        errorMessage.toLowerCase().includes('pipeline')
      
      if (isDecodeError && retryCount < 3) {
        // Exponential backoff: 250ms, 500ms, 1000ms (capped at 2000ms)
        const delay = Math.min(250 * Math.pow(2, retryCount), 2000)
        console.warn(`Decode error detected, retrying in ${delay}ms (attempt ${retryCount + 1}/3)`)
        
        setTimeout(() => {
          try {
            if (el && typeof el.load === 'function') {
              el.load() // reload playlist
              const p = el.play?.()
              if (p && typeof p.catch === 'function') {
                p.catch(() => {})
              }
              setRetryCount(prev => prev + 1)
            }
          } catch (err) {
            console.warn('Video reload failed:', err)
            setVideoFailed(true)
          }
        }, delay)
      } else if (isDecodeError && retryCount >= 3) {
        // Give up after 3 retries, show fallback
        console.warn('Video decode failed after 3 retries, showing fallback image')
        setVideoFailed(true)
      } else {
        // For non-decode errors, log but don't retry aggressively
        console.warn('Non-decode video error:', error)
      }
    }

    el.addEventListener('error', onError)
    return () => {
      el.removeEventListener('error', onError)
    }
  }, [homepagePlaybackId, retryCount, videoFailed])

  // Auto-play when visible
  useEffect(() => {
    if (showVideo && playerRef.current && !videoFailed) {
      const player = playerRef.current
      
      const handleCanPlay = () => {
        if (player && typeof player.play === 'function') {
          player.play().catch((err) => {
            console.warn('Video play failed:', err)
          })
        }
      }
      
      // Check if video is already ready
      const videoElement = player.video || player
      if (videoElement && videoElement.readyState >= 2) {
        handleCanPlay()
      } else {
        player.addEventListener('canplay', handleCanPlay, { once: true })
      }
      
      return () => {
        player.removeEventListener('canplay', handleCanPlay)
      }
    }
  }, [showVideo, videoFailed])

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
          {homepagePlaybackId && !videoFailed ? (
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
              prefer-native
              preload="metadata"
              controls={false}
              poster={thumbnailUrl || undefined}
            />
          ) : videoFailed && thumbnailUrl ? (
            // Fallback to thumbnail image if video fails
            <img
              src={thumbnailUrl}
              alt="MASDA Gym"
              className={`${styles.videoBg} ${styles.videoVisible}`}
              style={{ 
                objectFit: 'cover',
                minHeight: '100%',
                width: '100%',
                height: '100%'
              }}
            />
          ) : null}
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
