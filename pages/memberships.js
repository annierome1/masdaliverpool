import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/components/memberships.module.css';

export default function MembershipsPage() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://masdaliverpool.com';

  const membershipPlans = [
    {
      title: 'Adult Membership',
      price: '£90.00',
      period: 'per month',
      paymentType: '18+',
      features: [
        '3-month minimum commitment',
        '1-month notice to cancel after initial 2 months'
      ],
      link: 'https://simplyjoin.uk?id=masdaliverpool.signups'
    },
    {
      title: 'Student Membership',
      price: '£75.00',
      period: 'per month',
      paymentType: '18+ Student ID required',
      features: [
        '3-month minimum commitment',
        '1-month notice to cancel after initial 2 months'
      ],
      link: 'https://simplyjoin.uk?id=masdaliverpool.signups'
    },
    {
      title: 'Junior Membership',
      price: '£75.00',
      period: 'per month',
      paymentType: 'Under 18',
      features: [
        '3-month minimum commitment',
        '1-month notice to cancel after initial 2 months'
      ],
      link: 'https://simplyjoin.uk?id=masdaliverpool.signups'
    },
    {
      title: 'Gym Use Only',
      subscriptionType: 'Recurring Subscription - Direct Debit',
      price: '£30.00',
      period: 'per month',
      note: 'Please note this membership does not include access to any classes.',
      features: [
        '3-payment minimum commitment',
        'Initial period of 2 payments, followed by 1 payment notice to cancel'
      ],
      link: 'https://simplyjoin.uk?id=masdaliverpool.signups',
      termsLink: '/terms'
    },
    {
      title: 'Student Gym Use Only',
      subscriptionType: 'Recurring Subscription - Direct Debit',
      price: '£25.00',
      period: 'per month',
      note: 'Please note this membership does not include access to any classes.',
      features: [
        '3-payment minimum commitment',
        'Initial period of 2 payments, followed by 1 payment notice to cancel'
      ],
      link: 'https://simplyjoin.uk?id=masdaliverpool.signups',
      termsLink: '/terms'
    }
  ];

  return (
    <>
      <Head>
        <title>Memberships | Masda Liverpool</title>
        <meta
          name="description"
          content="Choose the perfect membership plan for your training journey. Flexible options from £75/month. Join MASDA Gym Liverpool today."
        />
        
        {/* Open Graph */}
        <meta property="og:title" content="Membership Plans | MASDA Gym Liverpool" />
        <meta property="og:description" content="Join MASDA Gym Liverpool with flexible membership plans. Options from £75/month for juniors, students, and adults. Start your training journey today." />
        <meta property="og:image" content={`${baseUrl}/masda_logo_color_wt.png`} />
        <meta property="og:url" content={`${baseUrl}/memberships`} />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card */}
        <meta name="twitter:title" content="Membership Plans | MASDA Gym Liverpool" />
        <meta name="twitter:description" content="Join MASDA Gym Liverpool with flexible membership plans. Options from £75/month for juniors, students, and adults." />
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
              {plan.subscriptionType && (
                <p className={styles.subscriptionType}>{plan.subscriptionType}</p>
              )}
              <h2 className={styles.planTitle}>{plan.title}</h2>
              <div className={styles.priceSection}>
                <span className={styles.price}>{plan.price}</span>
                <span className={styles.period}>{plan.period}</span>
              </div>
              {plan.paymentType && (
                <p className={styles.paymentType}>{plan.paymentType}</p>
              )}
              {plan.note && (
                <p className={styles.planNote}>{plan.note}</p>
              )}
              <ul className={styles.planFeatures}>
                {plan.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
              {plan.termsLink && (
                <Link href={plan.termsLink} className={styles.termsLink}>
                  View Terms &amp; Conditions
                </Link>
              )}
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

