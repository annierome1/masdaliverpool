import Head from 'next/head'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
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
  const router = useRouter()
  const mainRef = useRef(null)
  const touchStartY = useRef(null)

  const [showVideo, setShowVideo] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  

  // Detect mobile viewport
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Slide-up animation on mobile, immediate nav on desktop
  const slideAndNavigate = () => {
    if (!isMobile) {
      router.push('/team')
      return
    }
    if (!mainRef.current || mainRef.current.classList.contains(styles.slideUp)) {
      router.push('/team')
      return
    }
    mainRef.current.classList.add(styles.slideUp)
    mainRef.current.addEventListener(
      'animationend',
      () => router.push('/team'),
      { once: true }
    )
  }

  // Swipe detection (mobile only)
  useEffect(() => {
    if (!isMobile) return
    const onTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY
    }
    const onTouchEnd = (e) => {
      if (touchStartY.current === null) return
      const deltaY = touchStartY.current - e.changedTouches[0].clientY
      touchStartY.current = null
      if (deltaY > 50) slideAndNavigate()
    }
    window.addEventListener('touchstart', onTouchStart)
    window.addEventListener('touchend', onTouchEnd)
    return () => {
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [isMobile])

  // Video fade-in after a short delay
  useEffect(() => {
    const t = setTimeout(() => setShowVideo(true), 1000)
    return () => clearTimeout(t)
  }, [])

  // Auto-play when visible
  useEffect(() => {
    if (showVideo && playerRef.current) {
      playerRef.current.play().catch(() => {})
    }
  }, [showVideo])

  // Spacebar toggles play/pause
  useEffect(() => {
    const onKey = (e) => {
      if (e.code === 'Space') {
        e.preventDefault()
        const p = playerRef.current
        if (p.paused) p.play()
        else p.pause()
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

      <main ref={mainRef} className={styles.main}>
        <div className={styles.videoCropper}>
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
          />
        </div>

        <div className={styles.overlay} />
        <div className={styles.content}>
          <h1>MASDA GYM LIVERPOOL</h1>
          <p>Train Hard. Fight Smart. Elevate.</p>
          <div className={styles.deskButton}>
            <Link href="/team" className={buttonStyles.rbutton}>
            Meet the team
          </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
