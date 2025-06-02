// pages/fighter-foundation.js
import Head from 'next/head'
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/components/foundation.module.css'

export default function FighterFoundationPage() {
  return (
    <>
      <Header />

      <Head>
        <title>Masda Fighter Foundation</title>
        <meta name="description" content="Building futures for fighters at Masda Gym" />
      </Head>

      <main className={styles.container}>
        <h1 className={styles.title}>Building Futures for Fighters</h1>

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {[
              ['mission-vision', 'Mission & Vision'],
              ['purpose', 'Purpose & Core Objectives'],
              ['eligibility-programs', 'Eligibility & Programs'],
              ['community', 'Community & Partnerships'],
              ['funding-governance', 'Funding & Governance'],
            ].map(([id, label]) => (
              <li key={id} className={styles.navItem}>
                <a href={`#${id}`} className={styles.navLink}>{label}</a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mission & Vision */}
        <section id="mission-vision" className={styles.section}>
          <h2 className={styles.sectionTitle}>Mission & Vision</h2>
          <h3 className={styles.sectionSubtitle}>Mission</h3>
          <p className={styles.text}>
            To empower and support athletes from Masda Gym who dedicate their lives to Muay Thai and Mixed Martial Arts (MMA) by providing financial, educational, and professional resources to ensure a successful transition into post-fighting careers and life beyond the ring.
          </p>
          <h3 className={styles.sectionSubtitle}>Vision</h3>
          <p className={styles.text}>
            The Masda Fighter Foundation envisions a world where combat sports athletes can pursue their passion without fear of an uncertain future. We aim to be a beacon of hope and opportunity, ensuring that every fighter who commits to Muay Thai or MMA at Masda Gym has the tools to thrive after their athletic careers end—whether they achieve professional success or not.
          </p>
        </section>

        {/* Purpose & Core Objectives */}
        <section id="purpose" className={styles.section}>
          <h2 className={styles.sectionTitle}>Purpose & Core Objectives</h2>
          <h3 className={styles.sectionSubtitle}>Purpose</h3>
          <p className={styles.text}>
            The Masda Fighter Foundation is dedicated to supporting athletes from Masda Gym in Liverpool who commit a portion of their lives to training and competing in Muay Thai and MMA. Recognising the physical, mental, and financial toll of these demanding sports, the Foundation provides comprehensive support to help fighters transition into the workforce and rebuild their lives post-career.
          </p>
          <ul className={styles.list}>
            <li><strong>Financial Support:</strong> Grants and stipends for living expenses, education costs, or business startup fees.</li>
            <li><strong>Education & Training:</strong> Access to vocational training, higher education, certifications, or skill-building programs.</li>
            <li><strong>Entrepreneurial Opportunities:</strong> Seed funding and mentorship for fighters launching businesses such as gyms or coaching services.</li>
          </ul>
          <h3 className={styles.sectionSubtitle}>Core Objectives</h3>
          <ul className={styles.list}>
            <li>Career Guidance: Partner with career counselors and job placement services.</li>
            <li>Mental Health & Wellness: Counseling and wellness programs for emotional support.</li>
            <li>Community Building: A network of former fighters and professionals to mentor athletes.</li>
          </ul>
        </section>

        {/* Eligibility & Programs */}
        <section id="eligibility-programs" className={styles.section}>
          <h2 className={styles.sectionTitle}>Eligibility & Programs</h2>
          <h3 className={styles.sectionSubtitle}>Eligibility Criteria</h3>
          <ul className={styles.list}>
            <li>Be a member of Masda Gym in Liverpool, England.</li>
            <li>Show dedication to competing professionally in Muay Thai or MMA.</li>
            <li>Commit to transitioning into a new career or life path post-fighting.</li>
            <li>Submit an application outlining goals, needs, and future plans.</li>
          </ul>
          {[
            ['Transition Grants', 'One-time or recurring financial aid for essentials like rent, utilities, and career transitions.'],
            ['Education Fund', 'Scholarships for college, trade schools, or certification programs (e.g., personal training, business management, or IT).'],
            ['Business Startup Fund', 'Micro-grants and mentorship for fighters launching businesses such as gyms, apparel brands, or coaching services.'],
            ['Career Placement Program', 'Collaboration with local employers to create opportunities in fitness, security, coaching, or trades, plus resume workshops.'],
            ['Wellness Support', 'Access to mental health professionals and group workshops on stress management, goal-setting, and life planning.'],
          ].map(([title, desc], i) => (
            <div key={i} className={styles.article}>
              <h4 className={styles.articleTitle}>{i + 1}. {title}</h4>
              <p className={styles.text}>{desc}</p>
            </div>
          ))}
        </section>

        {/* Community & Partnerships */}
        <section id="community" className={styles.section}>
          <h2 className={styles.sectionTitle}>Community & Partnerships</h2>
          <ul className={styles.list}>
            <li>Masda Gym: Identify eligible athletes and advise on program direction.</li>
            <li>Local Universities & Colleges: Affordable education options.</li>
            <li>Liverpool Businesses: Job opportunities and sponsorships.</li>
            <li>Combat Sports Organisations: Raise awareness for the Foundation.</li>
            <li>Mental Health Charities: Support fighters’ emotional well-being.</li>
          </ul>
        </section>

        {/* Funding, Leadership & Governance */}
        <section id="funding-governance" className={styles.section}>
          <h2 className={styles.sectionTitle}>Funding, Leadership & Governance</h2>
          <h3 className={styles.sectionSubtitle}>Funding</h3>
          <ul className={styles.list}>
            <li>Private: The Scott Rome Trust.</li>
            <li>Donations: Individuals, businesses, and combat sports affiliates.</li>
            <li>Sponsorships: Local and national brands in fitness and wellness.</li>
          </ul>
          <h3 className={styles.sectionSubtitle}>Leadership & Governance</h3>
          <p className={styles.text}>
            An advisory council of educators, business mentors, and former fighters guides program development.
          </p>
        </section>
      </main>

      <Footer />
    </>
  )
}
