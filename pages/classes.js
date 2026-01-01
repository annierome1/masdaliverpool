
import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import scheduleData from '../lib/scheduleData';
import styles from '../styles/components/classes.module.css';



export default function ClassesPage() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://masdaliverpool.com'

  return (
    <>
      <Head>
        <title>Classes | Masda Liverpool</title>
        <meta
          name="description"
          content="View our weekly class schedule and class offerings. Muay Thai, MMA, Boxing, and fitness training for all levels."
        />
        
        {/* Open Graph */}
        <meta property="og:title" content="Classes | MASDA Gym Liverpool" />
        <meta property="og:description" content="Join MASDA Gym Liverpool classes. Muay Thai, MMA, Boxing, and fitness training for all levels. View our weekly schedule." />
        <meta property="og:image" content={`${baseUrl}/masda_logo_color_wt.png`} />
        <meta property="og:url" content={`${baseUrl}/classes`} />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card */}
        <meta name="twitter:title" content="Classes | MASDA Gym Liverpool" />
        <meta name="twitter:description" content="Join MASDA Gym Liverpool classes. Muay Thai, MMA, Boxing, and fitness training for all levels. View our weekly schedule." />
        <meta name="twitter:image" content={`${baseUrl}/masda_logo_color_wt.png`} />
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
        
        <div className={styles.hours}>
      <p>Open from 9am – 9pm private lessons and group sessions available</p></div>
      
        <div className={styles.contactWrapper}>
          <Link href="/memberships" className={styles.contactButton}>
      Join Now
    </Link>
          <Link href="/contact" className={styles.contactButton}>
      Contact Us
    </Link>
        </div>
    </div>



      <Footer />
    </>
  );
}
