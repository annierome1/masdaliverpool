// pages/news.js
import { useEffect, useRef, useState} from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import styles from '../styles/components/news.module.css'
import { FaInstagram, FaUserCircle, FaPlay } from 'react-icons/fa'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'

export async function getStaticProps() {
  // change to use news.json 
  const newsItems = [
    {
      id: 1,
      title: 'MASDA Gym Liverpool Awarded Thai Fighter UK’s Gym of the Year 2024',
      text:
        'MASDA Gym Liverpool has been awarded the prestigious UK Gym of the Year 2024 by Thai Fighter UK. Their success across such a wide range of platforms has set a new standard for excellence in the sport.',
      author: 'Fight Record',
      url: 'https://fightrecord.co.uk/news/masda-gym-liverpool-awarded-thai-fighter-uks-gym-of-the-year-2024/',
    },
    {
      id: 2,
      title: 'MASDA Gym Fighters Take Over Bangkok’s Biggest Stages in Historic Week for UK Muay Thai',
      text:
        "MASDA Gym in Liverpool is set to make history, as eight of its fighters compete across the sport’s biggest global arenas in just eight days",
      author: 'Fight Record',
      url: 'https://fightrecord.co.uk/news/masda-gym-fighters-take-over-bangkoks-biggest-stages-in-historic-week-for-uk-muay-thai/',
    },
    {
      id: 3,
      title: 'Teen destined to be \'household name\' after becoming youngest champion',
      text:
        'Alfie Ponting, A passionate fighter who got off to a flying start in the art of Muay Thai boxing has become the youngest ever world champion at just 18-years-old.',
      author: 'Liverpool Echo',
      url: 'https://www.liverpoolecho.co.uk/news/liverpool-news/teen-destined-household-name-after-29243895',
    },
  ]
  return {
    props: { newsItems },
    revalidate: 300,
  }
}

export default function NewsPage({ newsItems }) {
  const [instagramPosts, setInstagramPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const [mediaDimensions, setMediaDimensions] = useState({})
  const swiperRef = useRef(null)
  const videoRefs = useRef({})
  const imageRefs = useRef({})

  // Simple Instagram API call
  useEffect(() => {
    async function fetchInstagramPosts() {
      try {
        setLoading(true)
        const response = await fetch('/api/instagram')
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const posts = await response.json()
        setInstagramPosts(posts)
      } catch (err) {
        setError('Instagram feed is currently unavailable. Please check back later.')
        setInstagramPosts([])
      } finally {
        setLoading(false)
      }
    }

    fetchInstagramPosts()
  }, [])

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768
      setIsMobile(mobile)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Auto-play videos on mobile when they come into view
  useEffect(() => {
    if (!isMobile || loading) return

    // Test: Auto-play first video immediately
    const firstVideo = Object.values(videoRefs.current)[0]
    if (firstVideo) {
      firstVideo.play().catch(() => {})
    }

    // Try Intersection Observer first
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const video = entry.target
            if (entry.isIntersecting) {
              video.play().catch(() => {})
            } else {
              video.pause()
            }
          })
        },
        {
          threshold: 0.3,
          rootMargin: '0px'
        }
      )

      const timeoutId = setTimeout(() => {
        Object.values(videoRefs.current).forEach((video) => {
          if (video) {
            observer.observe(video)
          }
        })
      }, 500)

      return () => {
        clearTimeout(timeoutId)
        observer.disconnect()
      }
    } else {
      // Fallback: simple scroll-based approach
      const handleScroll = () => {
        Object.values(videoRefs.current).forEach((video) => {
          if (video) {
            const rect = video.getBoundingClientRect()
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0
            if (isVisible) {
              video.play().catch(() => {})
            } else {
              video.pause()
            }
          }
        })
      }

      window.addEventListener('scroll', handleScroll)
      handleScroll() // Check initial state

      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [instagramPosts, isMobile, loading])

  // Handle navigation clicks
  const handlePrevClick = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev()
    }
  }

  const handleNextClick = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext()
    }
  }

  // Handle media dimension detection
  const handleMediaLoad = (postId, mediaType) => {
    return (event) => {
      const media = event.target
      const aspectRatio = media.videoWidth ? media.videoWidth / media.videoHeight : media.naturalWidth / media.naturalHeight
      
      setMediaDimensions(prev => ({
        ...prev,
        [postId]: {
          aspectRatio,
          mediaType,
          width: media.videoWidth || media.naturalWidth,
          height: media.videoHeight || media.naturalHeight
        }
      }))
    }
  }

  return (
    <>
      <Head>
        <title>News & Social | Masda Liverpool</title>
      </Head>
      <Header />

      <main className={styles.main}>
        <h2 className={styles.sectionTitle}>Latest News</h2>
        <section className={styles.newsSection}>
          <div className={styles.newsGrid}>
            {newsItems.map((item) => (
              <div key={item.id} className={styles.newsCard}>
                <div className={styles.meta}></div>
                <h3 className={styles.newsTitle}>
                  <a href={item.url} target="_blank" rel="noreferrer">
                    {item.title}
                  </a>
                </h3>
                <p>{item.text}</p>
                <div className={styles.author}>
                  <FaUserCircle className={styles.icon} />
                  <span>{item.author}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Instagram Feed Section */}
        <section className={styles.instaSection}>
          <div className={styles.instaTitleWrapper}>
            <h2 className={styles.instaTitle}>
              <FaInstagram className={styles.instaIcon} /> Instagram Feed
            </h2>
          </div>
          
          {loading ? (
            <div className={styles.loadingContainer}>
              <p>Loading Instagram posts...</p>
            </div>
          ) : error ? (
            <div className={styles.unavailableContainer}>
              <div className={styles.unavailableIcon}>
                <FaInstagram />
              </div>
              <h3>Instagram Feed Unavailable</h3>
              <p>{error}</p>
              <p className={styles.unavailableSubtext}>
                Follow us on Instagram for the latest updates and content!
              </p>
            </div>
          ) : instagramPosts.length === 0 ? (
            <div className={styles.unavailableContainer}>
              <div className={styles.unavailableIcon}>
                <FaInstagram />
              </div>
              <h3>No Posts Available</h3>
              <p>No Instagram posts found at this time.</p>
              <p className={styles.unavailableSubtext}>
                Follow us on Instagram for the latest updates and content!
              </p>
            </div>
          ) : (
            <div className={styles.instaContainer}>
              <button 
                className={styles.navButton + ' ' + styles.prevButton}
                onClick={handlePrevClick}
                aria-label="Previous posts"
              >
                &#8249;
              </button>
              
              <Swiper
                ref={swiperRef}
                modules={[Navigation]}
                spaceBetween={20}
                slidesPerView={1}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  1000: { slidesPerView: 2},
                  1150: { slidesPerView: 3 },
                  1400: { slidesPerView: 4 }, 
                }}
                loop={instagramPosts.length > 4}
                className={styles.instaSwiper}
              >
                {instagramPosts.map((post, idx) => (
                  <SwiperSlide key={post.id + '_' + idx}>
                                          <div 
                        className={styles.instaCard}
                        style={{
                          maxWidth: mediaDimensions[post.id]?.aspectRatio > 1.5 ? '500px' : 
                                   mediaDimensions[post.id]?.aspectRatio < 0.8 ? '300px' : '400px'
                        }}
                      >
                        <a
                          href={post.permalink}
                          target="_blank"
                          rel="noreferrer"
                          className={styles.cardLink}
                        >
                        <div 
                          className={styles.mediaContainer}
                          style={{
                            aspectRatio: mediaDimensions[post.id]?.aspectRatio || '1/1'
                          }}
                        >
                          {post.media_type === 'VIDEO' ? (
                            <div className={styles.videoContainer}>
                              <video
                                ref={(el) => {
                                  if (el) videoRefs.current[post.id] = el
                                }}
                                className={styles.instaVideo}
                                poster={post.thumbnail_url}
                                preload="metadata"
                                muted
                                loop
                                playsInline
                                onLoadedMetadata={handleMediaLoad(post.id, 'VIDEO')}
                                onMouseEnter={(e) => {
                                  if (!isMobile) e.target.play()
                                }}
                                onMouseLeave={(e) => {
                                  if (!isMobile) e.target.pause()
                                }}
                              >
                                <source src={post.media_url} type="video/mp4" />
                              </video>
                              <div className={styles.playIcon}>
                                <FaPlay />
                              </div>
                            </div>
                          ) : (
                            <img
                              ref={(el) => {
                                if (el) imageRefs.current[post.id] = el
                              }}
                              src={post.media_url}
                              alt={post.caption?.slice(0, 100) || 'Instagram post'}
                              className={styles.instaImage}
                              onLoad={handleMediaLoad(post.id, 'IMAGE')}
                            />
                          )}
                        </div>
                        <div className={styles.cardContent}>
                          <p className={styles.caption}>
                            {post.caption?.split('\n')[0]?.slice(0, 120)}
                            {post.caption?.length > 120 ? '...' : ''}
                          </p>
                        </div>
                      </a>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              
              <button 
                className={styles.navButton + ' ' + styles.nextButton}
                onClick={handleNextClick}
                aria-label="Next posts"
              >
                &#8250;
              </button>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}
