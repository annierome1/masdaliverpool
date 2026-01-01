import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/components/memberships.module.css';

export default function MembershipsPage() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://masdaliverpool.com';

  const membershipPlans = [
    {
      title: 'Junior Membership',
      price: '£45.00',
      period: 'per month',
      paymentType: 'Monthly - Direct Debit',
      features: [
        'Includes 1 secondary customer (2 total)',
        '3-month minimum commitment',
        '1-month notice to cancel after initial 2 months'
      ],
      link: 'https://simplyjoin.uk/?id=masda.membershippackagesonlinesignup'
    },
    {
      title: 'Student Membership (Under 18)',
      price: '£60.00',
      period: 'per month',
      paymentType: 'Monthly - Direct Debit',
      features: [
        'Includes 1 secondary customer (2 total)',
        '3-month minimum commitment',
        '1-month notice to cancel after initial 2 months'
      ],
      link: 'https://simplyjoin.uk/?id=masda.membershippackagesonlinesignup'
    },
    {
      title: 'Student Membership (Over 18)',
      price: '£60.00',
      period: 'per month',
      paymentType: 'Full - Card Payment',
      features: [
        '3-month minimum commitment',
        '1-month notice to cancel after initial 2 months'
      ],
      link: 'https://simplyjoin.uk/?id=masda.membershippackagesonlinesignup'
    },
    {
      title: 'Adult Membership',
      price: '£70.00',
      period: 'per month',
      paymentType: 'Monthly - Direct Debit',
      features: [
        '3-month minimum commitment',
        '1-month notice to cancel after initial 2 months'
      ],
      link: 'https://simplyjoin.uk/?id=masda.membershippackagesonlinesignup'
    },
    {
      title: 'Fully Paid Annual',
      price: '£600.00',
      period: 'up front',
      paymentType: '12 months of adult membership',
      features: [
        'Includes 2 months discount',
        'No recurring payments'
      ],
      link: 'https://simplyjoin.uk/?id=masda.membershippackagesonlinesignup'
    }
  ];

  return (
    <>
      <Head>
        <title>Memberships | Masda Liverpool</title>
        <meta
          name="description"
          content="Choose the perfect membership plan for your training journey. Flexible options from £45/month. Join MASDA Gym Liverpool today."
        />
        
        {/* Open Graph */}
        <meta property="og:title" content="Membership Plans | MASDA Gym Liverpool" />
        <meta property="og:description" content="Join MASDA Gym Liverpool with flexible membership plans. Options from £45/month for juniors, students, and adults. Start your training journey today." />
        <meta property="og:image" content={`${baseUrl}/masda_logo_color_wt.png`} />
        <meta property="og:url" content={`${baseUrl}/memberships`} />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card */}
        <meta name="twitter:title" content="Membership Plans | MASDA Gym Liverpool" />
        <meta name="twitter:description" content="Join MASDA Gym Liverpool with flexible membership plans. Options from £45/month for juniors, students, and adults." />
        <meta name="twitter:image" content={`${baseUrl}/masda_logo_color_wt.png`} />
      </Head>

      <Header />

      <main className={styles.mainContent}>
        <div className={styles.heroSection}>
          <h1 className={styles.heading}>Membership Plans</h1>
          <p className={styles.subheading}>
            Choose the plan that fits your journey
          </p>
        </div>

        <section className={styles.membershipPlans}>
          {membershipPlans.map((plan, index) => (
            <div key={index} className={styles.planCard}>
              <h2 className={styles.planTitle}>{plan.title}</h2>
              <div className={styles.priceSection}>
                <span className={styles.price}>{plan.price}</span>
                <span className={styles.period}>{plan.period}</span>
              </div>
              <p className={styles.paymentType}>{plan.paymentType}</p>
              <ul className={styles.planFeatures}>
                {plan.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
              <Link href={plan.link} className={styles.planButton} target="_blank" rel="noopener noreferrer">
                Choose Plan
              </Link>
            </div>
          ))}
        </section>

        <section className={styles.infoSection}>
          <h2 className={styles.infoTitle}>Membership Information</h2>
          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <h3>Flexible Options</h3>
              <p>We offer membership plans to suit every age group and commitment level, from juniors to adults.</p>
            </div>
            <div className={styles.infoCard}>
              <h3>Easy Sign-Up</h3>
              <p>Join online with our simple sign-up process. Most plans require a 3-month minimum commitment.</p>
            </div>
            <div className={styles.infoCard}>
              <h3>Cancel Anytime</h3>
              <p>After your initial commitment period, cancel with just 1-month notice. No hidden fees.</p>
            </div>
          </div>
        </section>

        <div className={styles.ctaSection}>
          <p className={styles.ctaText}>
            Open from 9am – 9pm. Private lessons and group sessions available.
          </p>
          <div className={styles.ctaWrapper}>
            <Link href="/contact" className={styles.contactButton}>
              Contact Us
            </Link>
            <Link href="/classes" className={styles.classesButton}>
              View Classes
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

