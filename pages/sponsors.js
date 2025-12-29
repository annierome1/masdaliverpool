// pages/sponsors.js
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Image from 'next/image'
import styles from '../styles/components/sponsors.module.css'

// Sponsor groups
const officialPartners = [
  { src: '/sponsors/brick_barn.png', alt: 'Brick & Barn', name: 'Brick & Barn', desc: 'Helping us lay the foundation for future champions.', url: 'https://brickandbarngroup.com/agents/scott-rome' },
  { src: '/sponsors/concordia_banner.jpg', alt: 'Concordia Clinic', name: 'Concordia Clinic', desc: 'Providing health and recovery support for our athletes.', url: 'https://concordiaclinic.com/' },
  { src: '/sponsors/primo_white.png', alt: 'Primo Fightwear', name: 'Primo Fightwear', desc: 'Equipping our athletes with the best combat gear in the industry.', url: 'https://www.primofightwear.com/' }
]

const sponsors = [
  { src: '/sponsors/grip.jpg', alt: 'My Grip Fashion', name: 'My Grip Fashion', desc: null, url: 'https://mygripfashions.com/?srsltid=AfmBOooKHBHN6ETCIjYn_62ywS3cyY5OUxzObluT1LE7DoHE5fPfxzqO' },
  { src: '/sponsors/pezz.jpg.jpeg', alt: 'PEZ Scaffolding', name: 'PEZ Scaffolding', desc: null, url: 'https://www.facebook.com/people/PEZ-Scaffold/100090347755503/' },
  { src: null, alt: '', name: 'Anfield MOT & Service', desc: null, url: 'https://anfieldmotservice.co.uk/' },
  { src: '/sponsors/egrs.jpeg', alt: 'Eazy Garden Rooms', name: 'Eazy Garden Rooms', desc: null, url: 'https://www.eazygardenrooms.com/' },
  { src: '/sponsors/ur.jpeg', alt: 'Urban Runner', name: 'Urban Runner', desc: null, url: 'https://urbanrunner.co.uk/' }
]

const mediaPartners = [
  { src: '/sponsors/fightd.png', alt: 'Fight Division', name: 'Fight Division', desc: null, url: 'https://fightdivision.co.uk/' },
  { src: '/sponsors/fightr.png', alt: 'Fight Record', name: 'Fight Record', desc: null, url: 'https://fightrecord.co.uk/' }
]

export default function SponsorsPage() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://masdaliverpool.com'

  return (
    <>
      <Head>
        <title>Our Sponsors | Masda Liverpool</title>
        <meta
          name="description"
          content="Meet the proud sponsors of Masda Liverpool. We thank them for their support in building our fight community."
        />
        
        {/* Open Graph */}
        <meta property="og:title" content="Our Partners & Sponsors | MASDA Gym Liverpool" />
        <meta property="og:description" content="Meet the proud sponsors and partners of MASDA Liverpool. We thank them for their support in building our fight community." />
        <meta property="og:image" content={`${baseUrl}/masda_logo_color_wt.png`} />
        <meta property="og:url" content={`${baseUrl}/sponsors`} />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card */}
        <meta name="twitter:title" content="Our Partners & Sponsors | MASDA Gym Liverpool" />
        <meta name="twitter:description" content="Meet the proud sponsors and partners of MASDA Liverpool. We thank them for their support in building our fight community." />
        <meta name="twitter:image" content={`${baseUrl}/masda_logo_color_wt.png`} />
      </Head>

      <Header />

      <main className={styles.mainContent}>
        {/* Official Partners */}
        <h1 className={styles.heading}>Our Official Partners</h1>
        <p className={styles.subheading}>
          No one succeeds alone
        </p>
        <section className={styles.sponsorGrid}>
          {officialPartners.map(({ src, alt, name, desc, url }) => (
            <div key={name} className={styles.sponsorCard}>
              <div className={styles.logoWrapper}>
                {src ? (
                  <Image src={src} alt={alt} fill style={{ objectFit: 'contain' }} priority />
                ) : (
                  <div className={styles.fallbackText}>{name}</div>
                )}
              </div>
              <h3>{name}</h3>
              {desc && <p>{desc}</p>}
              <a href={url} target="_blank" rel="noreferrer" className={styles.learnMore}>
                Learn More
              </a>
            </div>
          ))}
        </section>

        {/* General Sponsors */}
        <h1 className={styles.sponsorsheading}>Our Sponsors</h1>
        <section className={styles.sponsorGrid}>
          {sponsors.map(({ src, alt, name, desc, url }) => (
            <div key={name} className={styles.sponsorCard}>
              <div className={styles.logoWrapper}>
                {src ? (
                  <Image src={src} alt={alt} fill style={{ objectFit: 'contain' }} />
                ) : (
                  <div className={styles.fallbackText}>{name}</div>
                )}
              </div>
              <h3>{name}</h3>
              {desc && <p>{desc}</p>}
              <a href={url} target="_blank" rel="noreferrer" className={styles.learnMore}>
                Learn More
              </a>
            </div>
          ))}
        </section>

        {/* Media Partners */}
        <h1 className={styles.sponsorsheading}>Our Media Partners</h1>
        <section className={styles.sponsorGrid}>
          {mediaPartners.map(({ src, alt, name, url }) => (
            <div key={name} className={styles.sponsorCard}>
              <div className={styles.logoWrapper}>
                <Image src={src} alt={alt} fill style={{ objectFit: 'contain' }} />
              </div>
              <h3>{name}</h3>
              <a href={url} target="_blank" rel="noreferrer" className={styles.learnMore}>
                Learn More
              </a>
            </div>
          ))}
        </section>
      </main>

      <Footer />
    </>
  )
}