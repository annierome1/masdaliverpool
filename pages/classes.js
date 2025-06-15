
import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import scheduleData from '../lib/scheduleData';
import styles from '../styles/components/classes.module.css';



export default function ClassesPage() {

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
        {/* Schedule Section */}
        <h1 className={styles.title}>Weekly Class Schedule</h1>
        <p className={styles.subheading}>
          The gym is where excuses go to die
        </p>
        
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
        

       <h1 className={styles.heading}>Membership Plans</h1>
<section className={styles.membershipPlans}>
  {/* Plan 1: Junior Membership */}
  <div className={styles.planCard}>
    <h2 className={styles.planTitle}>Junior Membership</h2>
    <div className={styles.subHeading}>
      <p>£45.00 per month</p>
      <p>Monthly - Direct Debit</p>
    </div>
    <ul className={styles.planFeatures}>
      <li>Includes 1 secondary customer (2 total)</li>
      <li>3-month minimum commitment</li>
      <li>1-month notice to cancel after initial 2 months</li>
    </ul>
    <Link href="https://simplyjoin.uk/?id=masda.membershippackagesonlinesignup" className={styles.planButton}>
      Choose Plan
    </Link>
  </div>

  {/* Plan 2: Student Membership (Under 18) */}
  <div className={styles.planCard}>
    <h2 className={styles.planTitle}>Student Membership (Under 18)</h2>
    <div className={styles.subHeading}>
      <p>£60.00 per month</p>
      <p>Monthly - Direct Debit</p>
    </div>
    <ul className={styles.planFeatures}>
      <li>Includes 1 secondary customer (2 total)</li>
      <li>3-month minimum commitment</li>
      <li>1-month notice to cancel after initial 2 months</li>
    </ul>
    <Link href="https://simplyjoin.uk/?id=masda.membershippackagesonlinesignup" className={styles.planButton}>
      Choose Plan
    </Link>
  </div>

  {/* Plan 3: Student Membership (Over 18) */}
  <div className={styles.planCard}>
    <h2 className={styles.planTitle}>Student Membership (Over 18)</h2>
    <div className={styles.subHeading}>
      <p>£60.00 per month</p>
      <p>Full - Card Payment</p>
    </div>
    <ul className={styles.planFeatures}>
      <li>3-month minimum commitment</li>
      <li>1-month notice to cancel after initial 2 months</li>
    </ul>
    <Link href="https://simplyjoin.uk/?id=masda.membershippackagesonlinesignup" className={styles.planButton}>
      Choose Plan
    </Link>
  </div>

  {/* Plan 4: Adult Membership */}
  <div className={styles.planCard}>
    <h2 className={styles.planTitle}>Adult Membership</h2>
    <div className={styles.subHeading}>
      <p>£70.00 per month</p>
      <p>Monthly - Direct Debit</p>
    </div>
    <ul className={styles.planFeatures}>
      <li>3-month minimum commitment</li>
      <li>1-month notice to cancel after initial 2 months</li>
    </ul>
    <Link href="https://simplyjoin.uk/?id=masda.membershippackagesonlinesignup" className={styles.planButton}>
      Choose Plan
    </Link>
  </div>

  {/* Plan 5: Annual Membership */}
  <div className={styles.planCard}>
    <h2 className={styles.planTitle}>Fully Paid Annual</h2>
    <div className={styles.subHeading}>
      <p>£600.00 up front</p>
      <p>12 months of adult membership</p>
    </div>
    <ul className={styles.planFeatures}>
      <li>Includes 2 months discount</li>
      <li>No recurring payments</li>
    </ul>
    <Link href="https://simplyjoin.uk/?id=masda.membershippackagesonlinesignup" className={styles.planButton}>
      Choose Plan
    </Link>
  </div>
</section>

        
        <div className={styles.hours}>
      <p>Open from 9am – 9pm private lessons and group sessions available</p></div>
      
        <div className={styles.contactWrapper}>
          <Link href="/contact" className={styles.contactButton}>
      Contact Us
    </Link>
        </div>
    </div>



      <Footer />
    </>
  );
}
