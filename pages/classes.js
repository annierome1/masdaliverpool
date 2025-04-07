import { useState } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import scheduleData from '../lib/scheduleData';
import styles from '../styles/components/classes.module.css';



export default function ClassesPage() {
  const [showSchedule, setShowSchedule] = useState(false);

  return (
    <>
      <Head>
        <title>Classes | Masda Liverpool</title>
        <meta
          name="description"
          content="View our class offerings, membership plans, and weekly schedule."
        />
      </Head>

      <Header />

      <div className={styles.pageContainer}>
        {/* Membership Plans */}
        <h1 className={styles.heading}>Membership Plans</h1>
        <section className={styles.membershipPlans}>
          {/* Plan 1: Class Memberships */}
          <div className={styles.planCard}>
            <h2 className={styles.planTitle}>Class Memberships</h2>
            <div className={styles.subHeading}>
              <p>Kids Membership – £40/month</p>
              <p>Adult Membership – £60/month</p>
            </div>
            <ul className={styles.planFeatures}>
              <li>Unlimited classes</li>
              <li>3 classes per day</li>
              <li>1 free uniform</li>
            </ul>
            <a href="#" className={styles.planButton}>
              Choose Plan
            </a>
          </div>

          {/* Plan 2: Gym Access */}
          <div className={styles.planCard}>
            <h2 className={styles.planTitle}>Gym Access</h2>
            <div className={styles.subHeading}>
              <p>Monthly Access</p>
              <p>£20 / month</p>
            </div>
            <ul className={styles.planFeatures}>
              <li>Full gym access</li>
              <li>24/7</li>
              <li>Fitness suite access</li>
            </ul>
            <a href="#" className={styles.planButton}>
              Choose Plan
            </a>
          </div>

          {/* Plan 3: Private Sessions */}
          <div className={styles.planCard}>
            <h2 className={styles.planTitle}>Private Sessions</h2>
            <div className={styles.subHeading}>
              <p>60 Minutes</p>
              <p>£30</p>
            </div>
            <ul className={styles.planFeatures}>
              <li>One-on-one training</li>
              <li>Available 7 days/week</li>
              <li>24hr cancellation policy</li>
            </ul>
            <a href="#" className={styles.planButton}>
              Book Session
            </a>
          </div>
        </section>

        {/* Schedule Section */}
        <h1 className={styles.heading}>Weekly Class Schedule</h1>
        <button
          className={styles.scheduleToggle}
          onClick={() => setShowSchedule(!showSchedule)}
        >
          {showSchedule ? 'Hide Schedule' : 'View Schedule'}
        </button>

        {showSchedule && (
          <div className={styles.scheduleWrapper}>
            <table className={styles.scheduleTable}>
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Monday</th>
                  <th>Tuesday</th>
                  <th>Wednesday</th>
                  <th>Thursday</th>
                  <th>Friday</th>
                  <th>Saturday</th>
                  <th>Sunday</th>
                </tr>
              </thead>
              <tbody>
                {scheduleData.map((row) => (
                  <tr key={row.time}>
                    <td>{row.time}</td>
                    <td>{row.monday}</td>
                    <td>{row.tuesday}</td>
                    <td>{row.wednesday}</td>
                    <td>{row.thursday}</td>
                    <td>{row.friday}</td>
                    <td>{row.saturday}</td>
                    <td>{row.sunday}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
