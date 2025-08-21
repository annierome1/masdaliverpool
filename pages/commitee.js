import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/components/committee.module.css';

// Committee member data
const committeeMembers = [
  {
    id: 1,
    name: "Alex Forman",
    role: "Founder & Chairman",
    image: "/commitee/Alex.jpeg"
  },
  {
    id: 2,
    name: "Scott Rome",
    role: "Co-Founder & Director",
    image: "/commitee/Scott.jpeg"
  },
  {
    id: 3,
    name: "Rob Aspell",
    role: "Education & Career Development",
    image:  "/commitee/Rob.jpeg"
  },
  {
    id: 4,
    name: "John Fairbrother",
    role: "Financial & Investment Advisor",
    image: "/commitee/John.jpeg"
  },
  {
    id: 5,
    name: "Levi Bailey",
    role: "Mental Health & Wellness",
    image:  "/commitee/Levi.jpeg"
  },
  {
    id: 6,
    name: "Evie Hitchen",
    role: "Community Outreach & Partnerships",
    image:  "/commitee/Evie.jpg"
  },
  {
    id: 7,
    name: "Tony Moran",
    role: "Community Outreach & Partnerships",
    image:  "/commitee/Tony.jpeg"
  }
];

export default function CommitteePage() {
  return (
    <>
      <Head>
        <title>Advisory Committee | Masda Fighter Foundation</title>
        <meta 
          name="description" 
          content="Meet the Advisory Committee of the Masda Fighter Foundation - dedicated professionals guiding our mission to support fighters' futures." 
        />
      </Head>

      <Header />

      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.heroSection}>

        </section>

        {/* Introduction Section */}
        <section className={styles.introSection}>
          <div className={styles.introContent}>
            <h2>Our Advisory Committee</h2>
            <p>
            The Masda Fighter Foundation Advisory Committee is a dedicated team of educators, business mentors, and former fighters committed to shaping the future of our programs. With their diverse expertise, they guide the development of initiatives that empower fighters to transition successfully from their careers in the ring to thriving lives beyond the sport. Their insights ensure our programs provide practical support, mentorship, and opportunities for personal and professional growth.
            </p>

          </div>
        </section>

        {/* Committee Members Grid */}
        <section className={styles.membersSection}>
          <div className={styles.membersGrid}>
            {committeeMembers.map(member => (
              <div key={member.id} className={styles.memberCard}>
                <div className={styles.memberImage}>
                  <img
                    src={member.image}
                    alt={member.name}
                    className={styles.memberPhoto}
                  />
                </div>
                <div className={styles.memberInfo}>
                  <h3 className={styles.memberName}>{member.name}</h3>
                  {/* <p className={styles.memberRole}>{member.role}</p> */}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaContent}>
            <h2>Get Involved</h2>
            <p>
              Interested in supporting our mission? Learn more about how you can contribute
              to the Masda Fighter Foundation.
            </p>
            <div className={styles.ctaButtons}>
              <Link href="/foundation" className={styles.ctaButton}>
                Learn More
              </Link>
              <Link href="/contact" className={styles.ctaButtonSecondary}>
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
