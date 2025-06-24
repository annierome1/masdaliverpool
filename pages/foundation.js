// pages/foundation.js
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import styles from '../styles/components/foundation.module.css'

export default function FoundationPage() {
  return (
    <>
      <Head>
        <title>Fighter Foundation | Masda Liverpool</title>
        <meta
          name="description"
          content="Learn about the Masda Fighter Foundation: mission, vision, programs, and how you can get involved."
        />
      </Head>

      <Header />

      <main className={styles.main}>
        {/* Hero / Overview */}
        <section className={styles.heroSection}>
          <div className={styles.heroOverlay}>
            <h1 className={styles.heroTitle}>Masda Fighter Foundation</h1>
            <p className={styles.heroSubtitle}>
              Building Futures for Fighters
            </p>
          </div>
        </section>

        

      <div className={styles.logoWrapper}>
        <img
          src="/masdaff_transparent.png"
          alt="Masda Fighter Foundation Logo"
          className={styles.foundationLogo}
        />
      </div>
        <section className={styles.sectionAlt}>
          <h2 className={styles.sectionHeading}>How it Began</h2>
          <div className={styles.sectionAltContent}>
            <div className={styles.sectionAltImage}>
              <img
                src="/scott_alex.jpg" 
                alt="How Masda Foundation Began"
              />
            </div>
            <div className={styles.textBlock}>
              <p>
                Scott Rome, an American entrepreneur, first connected with Masda Gym when he observed the fighters&apos; extraordinary dedication and passion. Day after day, they sharpened their combat skills with unwavering focus and their commitment to excellence which resonated with Scott&apos;s own business work ethic. Inspired to make a difference, he partnered with Masda Gym&apos;s founder, owner, and coach, Alex Forman, to chart a revitalised strategic direction.
              </p>
              <p>
                As Scott immersed himself in the gym&apos;s community, he identified a critical gap prevalent not only at Masda but also at combat sports academies worldwide. While Masda and others provide exceptional training and guidance during fighters&apos; competitive prime, they offer little support for life after their careers. Because of this, Scott and Alex decided to define a broader purpose for Masda&apos;s unique team, crafting a vision that supports fighters not only in the ring but also in building sustainable futures beyond it. This commitment laid the foundation for the gym&apos;s mission to empower athletes for the long term and led to the establishment of the Masda Fighter Foundation.
              </p>
            </div>
          </div>
        </section>



        {/* Mission & Vision */}
        <section className={styles.section}>
          
          <h2 className={styles.sectionHeading}>Mission &amp; Vision</h2>
          <div className={styles.textBlock}>
            <h3>Mission</h3>
            <p>
              To empower and support athletes from Masda Gym who dedicate their
              lives to Muay Thai and Mixed Martial Arts (MMA) by providing
              financial, educational, and professional resources to ensure a
              successful transition into post-fighting careers and life beyond
              the ring.
            </p>

            <h3>Vision</h3>
            <p>
              The Masda Fighter Foundation envisions a world where combat sports
              athletes can pursue their passion without fear of an uncertain
              future. We aim to be a beacon of hope and opportunity, ensuring
              that every fighter who commits to Muay Thai or MMA at Masda Gym
              has the tools to thrive after their athletic careers end—whether
              they achieve professional success or not.
            </p>
          </div>
        </section>

        {/* Purpose & Core Objectives */}
        <section className={styles.sectionAlt}>
          <h2 className={styles.sectionHeading}>Purpose &amp; Core Objectives</h2>
          <div className={styles.textAndImage}>
            <div className={styles.textBlock}>
              <h3>Purpose</h3>
              <p>
                The Masda Fighter Foundation is dedicated to supporting athletes
                from Masda Gym in Liverpool who commit a portion of their lives to
                training and competing in Muay Thai and MMA. Recognising the
                physical, mental, and financial toll of these demanding sports,
                the Foundation provides comprehensive support to help fighters
                transition into the workforce and rebuild their lives post-career.
                Our goal is to bridge the gap between the end of an athletic
                journey and the beginning of a fulfilling new chapter.
              </p>
              <ul className={styles.bulletList}>
                <li>
                  <strong>Financial Support:</strong> Grants and stipends to
                  cover living expenses, education costs, or business startup
                  expenses during transition.
                </li>
                <li>
                  <strong>Education &amp; Training:</strong> Fund access to
                  vocational training, higher education, certifications, or skill
                  building programs.
                </li>
                <li>
                  <strong>Entrepreneurial Opportunities:</strong> Seed funding and
                  mentorship for fighters looking to start businesses—gyms,
                  coaching, apparel, etc.
                </li>
              </ul>
            </div>
            <div className={styles.imageWrapper}>
              <img
                src="/foundation.png"
                alt="Fighter training"
                className={styles.sectionImage}
              />
            </div>
          </div>

          <div className={styles.coreObjectives}>
            <h3>Core Objectives</h3>
            <ul className={styles.bulletList}>
              <li>
                <strong>Career Guidance:</strong> Partner with career counselors
                and job placement services to connect fighters with meaningful
                employment.
              </li>
              <li>
                <strong>Mental Health & Wellness:</strong> Provide access to
                counseling and wellness programs to support fighters’ mental
                and emotional health during their transition.
              </li>
              <li>
                <strong>Community Building:</strong> Foster a supportive network
                of former fighters, mentors, and professionals to inspire and
                guide athletes.
              </li>
            </ul>
          </div>
        </section>

        {/* Eligibility & Programs */}
        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>Eligibility &amp; Programs</h2>
          <div className={styles.textBlock}>
            <h3>Eligibility Criteria</h3>
            <ul className={styles.bulletList}>
              <li>Be a member of Masda Gym in Liverpool, England.</li>
              <li>Show dedication to competing professionally in Muay Thai or
                MMA.</li>
              <li>Demonstrate a commitment to transitioning into a new career or
                life path post-fighting.</li>
              <li>Submit an application outlining goals, needs, and future
                plans.</li>
            </ul>

            <h3>Programs &amp; Services</h3>
            <div className={styles.programsGrid}>
              <div className={styles.programCard}>
                <h4>Transition Grants</h4>
                <p>
                  One-time or recurring financial aid to cover essentials like
                  rent, utilities, and career transition costs.
                </p>
              </div>
              <div className={styles.programCard}>
                <h4>Education Fund</h4>
                <p>
                  Scholarships for college, trade schools, or certification
                  programs. Partnerships with local institutions for discounted
                  courses.
                </p>
              </div>
              <div className={styles.programCard}>
                <h4>Business Startup Fund</h4>
                <p>
                  Micro-grants to help fighters launch businesses (gyms, apparel
                  brands, coaching services) and mentorship from successful
                  entrepreneurs.
                </p>
              </div>
              <div className={styles.programCard}>
                <h4>Career Placement Program</h4>
                <p>
                  Collaboration with local employers to create job opportunities
                  (fitness, security, coaching, trades) plus resume-building
                  workshops and interview preparation.
                </p>
              </div>
              <div className={styles.programCard}>
                <h4>Wellness Support</h4>
                <p>
                  Access to mental health professionals specializing in
                  post-athletic career transitions, plus group workshops on stress
                  management, goal-setting, and life planning.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Community & Partnerships */}
        <section className={styles.sectionAlt}>
          <h2 className={styles.sectionHeading}>Community &amp; Partnerships</h2>
          <div className={styles.textAndImage}>
            <div className={styles.imageWrapperCP}>
              <img
                src="/foundation2.jpg"
                alt="Community partnership"
                className={styles.sectionImage}
              />
            </div>
            <div className={styles.textBlock}>
              <p>
                The Masda Fighter Foundation collaborates with:
              </p>
              <ul className={styles.bulletList}>
                <li>
                  <strong>Masda Gym:</strong> To identify eligible athletes and
                  guide program direction.
                </li>
                <li>
                  <strong>Local Universities &amp; Colleges:</strong> To provide
                  affordable education options.
                </li>
                <li>
                  <strong>Liverpool Businesses:</strong> To create job
                  opportunities and sponsorships.
                </li>
                <li>
                  <strong>Combat Sports Organizations:</strong> To raise
                  awareness and offer strategic support.
                </li>
                <li>
                  <strong>Mental Health Charities:</strong> To support fighters’
                  emotional well-being.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Funding, Leadership, & Governance */}
        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>
            Funding, Leadership, &amp; Governance
          </h2>
          <div className={styles.textBlock}>
            <h3>Funding</h3>
            <p>
              The Masda Fighter Foundation sustains its programs through a
              combination of:
            </p>
            <ul className={styles.bulletList}>
              <li>
                <strong>Private Funding</strong>
              </li>
              <li>
                <strong>Donations:</strong> Contributions from individuals,
                businesses, and combat sports affiliates.
              </li>
              <li>
                <strong>Sponsorships:</strong> Partnerships with local and
                national brands in fitness, sports, and wellness industries.
              </li>
            </ul>

            <h3>Leadership &amp; Governance</h3>
            <p>
              The Foundation is overseen by an advisory council of educators,
              business mentors, and former fighters who guide program
              development and ensure transparent governance.
            </p>
            <div className={styles.downloadWrapper}>
  <a
    href="https://masdaliverpool.s3.us-east-2.amazonaws.com/masdabrouchurer.pdf"
    target="_blank"
    rel="noopener noreferrer"
    download
    className={styles.downloadButton}
  >
    Download Foundation Brochure
  </a>
</div>

          </div>

        </section>
      </main>

      <Footer />
    </>
  )
}
