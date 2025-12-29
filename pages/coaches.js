import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Image from 'next/image';
import styles from '../styles/components/coaches.module.css';
import { FaInstagram, FaTiktok, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import Link from 'next/link';

// Sample coach data - you can replace this with Sanity data later
const coachesData = [
  {
    id: 1,
    name: "Alex Forman",
    role: "",
    image: "/coaches/Alex.jpeg",
    bio: "Scott is the founder and head coach of MASDA Gym Liverpool. With over 20 years of experience in Muay Thai and MMA, he has trained numerous champions and built MASDA into one of the UK's premier combat sports academies.",
    experience: "20+ years",
    social: {
      instagram: "https://www.instagram.com/masdagym/?hl=en",
    }
  },
  {
    id: 2,
    name: "JP Gallacher",
    role: "",
    image: "/coaches/jp.jpg",
    bio: "",
    experience: "",
    social: {
      instagram: "https://www.instagram.com/jpgallacher/",
    }
  },
  {
    id: 3,
    name: "Tony Moran",
    role: "",
    image: "/coaches/Tony.jpeg",
    bio: "Scott is the founder and head coach of MASDA Gym Liverpool. With over 20 years of experience in Muay Thai and MMA, he has trained numerous champions and built MASDA into one of the UK's premier combat sports academies.",
    experience: "20+ years",
    social: {
      instagram: "",
    }
  },
  {
    id: 4,
    name: "Alfie Ponting",
    role: "",
    image: "/coaches/Alfie.jpeg",
    bio: "Alex is our senior Muay Thai coach with extensive experience in traditional Thai boxing. He has competed at the highest levels and brings authentic Muay Thai techniques to every training session.",
    experience: "15+ years",
    social: {
      instagram: "https://www.instagram.com/alfiepono_masda/",
    }
  },
  {
    id: 5,
    name: "Owen Gillis",
    role: "",
    image: "/coaches/Owen.jpeg",
    bio: "Sarah specializes in strength and conditioning for combat sports athletes. She designs personalized training programs that enhance performance, prevent injuries, and build the physical foundation needed for success.",
    experience: "12+ years",
    social: {
      instagram: "https://www.instagram.com/owengillis_masda/?hl=en",
    }
  },
  {
    id: 6,
    name: "Marc Campbell",
    role: "",
    image: "/coaches/Marc.jpeg",
    bio: "Mike is our boxing specialist with a background in amateur and professional boxing. He focuses on developing proper technique, footwork, and boxing strategy for all skill levels.",
    experience: "18+ years",
    social: {
      instagram: "https://www.instagram.com/marccampbell_masda/?hl=en",
    }
  },
  {
    id: 7,
    name: "Kenny Carey",
    role: "",
    image: "/coaches/Kenny.jpeg",
    bio: "Emma specializes in MMA and grappling techniques. She brings a comprehensive approach to mixed martial arts, combining striking and ground fighting skills.",
    experience: "14+ years",
    social: {
      instagram: "https://www.instagram.com/kennycarey_masda/?hl=en",
    }
  },
  {
    id: 8,
    name: "Hassan Imran",
    role: "",
    image: "/coaches/Hassan.jpeg",
    bio: "David focuses on kickboxing techniques and fitness training. He creates dynamic workouts that improve cardiovascular fitness while teaching effective striking combinations.",
    experience: "16+ years",
    social: {
      instagram: "https://www.instagram.com/hassanimran_masda/?hl=en",
    }
  },
  {
    id: 8,
    name: "Jacob Charnock",
    role: "",
    image: "/coaches/Jacob.jpeg",
    bio: "Lisa specializes in working with youth and beginner students. She creates a supportive environment that builds confidence and develops fundamental martial arts skills.",
    experience: "10+ years",
    social: {
      instagram: "https://www.instagram.com/jacobcharnock_masda/?hl=en",
    }
  }
];

export default function Coaches() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://masdaliverpool.com'

  return (
    <>
      <Head>
        <title>Meet Our Coaches | Masda Liverpool</title>
        <meta name="description" content="Meet the expert coaches at Masda Gym Liverpool - Muay Thai, MMA, Boxing, and Strength & Conditioning specialists" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Meet Our Coaches | MASDA Gym Liverpool" />
        <meta property="og:description" content="Meet the expert coaches at MASDA Gym Liverpool - Muay Thai, MMA, Boxing, and Strength & Conditioning specialists with years of experience." />
        <meta property="og:image" content={`${baseUrl}/masda_logo_color_wt.png`} />
        <meta property="og:url" content={`${baseUrl}/coaches`} />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card */}
        <meta name="twitter:title" content="Meet Our Coaches | MASDA Gym Liverpool" />
        <meta name="twitter:description" content="Meet the expert coaches at MASDA Gym Liverpool - Muay Thai, MMA, Boxing, and Strength & Conditioning specialists." />
        <meta name="twitter:image" content={`${baseUrl}/masda_logo_color_wt.png`} />
      </Head>
      
      <Header />

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Meet Our Coaches</h1>
          <p className={styles.heroSubtitle}>Expert guidance from world-class trainers</p>
        </div>
      </section>

      {/* Main Content */}
      <main className={styles.mainContent}>
        {/* Coaches Grid */}
        <section className={styles.coachesSection}>
          <div className={styles.coachesGrid}>
            {coachesData.map(coach => (
              <article key={coach.id} className={styles.coachCard}>
                <div className={styles.imageContainer}>
                  <Image
                    src={coach.image}
                    alt={coach.name}
                    fill
                    className={styles.coachImage}
                    priority={coach.id <= 3}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                
                <div className={styles.coachInfo}>
                  <h3 className={styles.coachName}>{coach.name}</h3>
                  {/* <p className={styles.coachRole}>{coach.role}</p> */}
                  {/* <div className={styles.experienceBadge}>
                    <span>{coach.experience} Experience</span>
                  </div> */}
                 {/* <p className={styles.coachBio}>{coach.bio}</p> */}
                  <div className={styles.socialIcons}>
                    {coach.social.instagram && (
                      <a href={coach.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                        <FaInstagram />
                      </a>
                    )}
                    {coach.social.tiktok && (
                      <a href={coach.social.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                        <FaTiktok />
                      </a>
                    )}
                    {coach.social.facebook && (
                      <a href={coach.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                        <FaFacebook />
                      </a>
                    )}
                    {coach.social.twitter && (
                      <a href={coach.social.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                        <FaTwitter />
                      </a>
                    )}
                    {coach.social.linkedin && (
                      <a href={coach.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                        <FaLinkedin />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaContent}>
            <h2>Ready to Start Training?</h2>
            <p>Book a session with one of our expert coaches today</p>
            <Link href="/contact" className={styles.ctaButton}>Book Now</Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}


