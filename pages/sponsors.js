import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/components/sponsors.module.css';

export default function SponsorsPage() {
  return (
    <>
      <Head>
        <title>Our Sponsors | Masda Liverpool</title>
        <meta
          name="description"
          content="Meet the proud sponsors of Masda Liverpool. We thank them for their support in building our fight community."
        />
      </Head>

      <Header />

      <main className={styles.mainContent}>
        <h1 className={styles.heading}>Our Official Partners</h1>
        <p className={styles.subheading}>
          We’re proud to be backed by a network of amazing partners who support our fighters, community, and vision.
        </p>

        <section className={styles.sponsorGrid}>
          {/* Repeat this card for each sponsor */}
          <div className={styles.sponsorCard}>
            <img
              src="/sponsors/brick_barn.png"
              alt="Brick & Barn"
              style={{
                width: '300px',
                height: 'auto',
                objectFit: 'contain',
                marginBottom: '3rem',
                marginTop: '4rem'
              }}
            />
            <h3>Brick & Barn</h3>
            <p>Helping us lay the foundation for future champions.</p>
             <a
      href="https://brickandbarngroup.com/agents/scott-rome"
      target="_blank"
      rel="noreferrer"
      className={styles.learnMore}
    >
      Learn More 
    </a>
          </div>

          <div className={styles.sponsorCard}>
            <img src="/sponsors/concordia_banner.jpg" alt="Concordia Clinic" />
            <h3>Concordia Clinic</h3>
            <p>Providing health and recovery support for our athletes.</p>
            <a
      href="https://concordiaclinic.com/"
      target="_blank"
      rel="noreferrer"
      className={styles.learnMore}
    >
      Learn More 
    </a>
          </div>
          <div className={styles.sponsorCard}>
            <img 
              src="/sponsors/primo_white.png" 
              alt="Primo Fightwear" 
              style={{
                width: '300px',
                height: 'auto',
                objectFit: 'contain',
                marginBottom: '3rem',
                marginTop: '4rem'
              }}/>
            <h3>Primo Fightwear</h3>
            <p>Providing health and recovery support for our athletes.</p>
            <a
      href="https://www.primofightwear.com/"
      target="_blank"
      rel="noreferrer"
      className={styles.learnMore}
    >
      Learn More 
    </a>
          </div>

        </section>



        <h1 className={styles.sponsorsheading}>Our Sponsors</h1>
        <section className={styles.sponsorGrid}>
          {/* Repeat this card for each sponsor */}
          <div className={styles.sponsorCard}>
            <img
              src="/sponsors/grip.jpg"
              alt="My Grip"
              style={{
                width: '300px',
                height: 'auto',
                objectFit: 'contain',
                marginBottom: '0rem',
                marginTop: '0rem'
              }}
            />
            <h3>My Grip Fashion</h3>
             <a
      href="https://mygripfashions.com/?srsltid=AfmBOooKHBHN6ETCIjYn_62ywS3cyY5OUxzObluT1LE7DoHE5fPfxzqO"
      target="_blank"
      rel="noreferrer"
      className={styles.learnMore}
    >
      Learn More 
    </a>
          </div>
          <div className={styles.sponsorCard}>
            <img 
              src="/sponsors/pezz.jpg.jpeg" 
              alt="" 
              style={{
                width: '400px',
                height: 'auto',
                objectFit: 'contain',
                marginBottom: '3rem',
                marginTop: '4rem'
              }}/>
            <h3>PEZ Scaffolding</h3>
            <a
      href="https://www.facebook.com/people/PEZ-Scaffold/100090347755503/"
      target="_blank"
      rel="noreferrer"
      className={styles.learnMore}
    >
      Learn More 
    </a>
    
          </div>

          <div className={styles.sponsorCard}>
              {/* instead of <img>… */}
              <div
                style={{
                  color: "white",            
                  fontWeight: 700,            
                  fontFamily: "Arial",
                  fontSize: "1.75rem",          
                  marginTop: "7rem",
                  marginBottom: "4rem",
                  textAlign: "center",
                  textTransform: "uppercase" 
                  
                }}
              >
                Anfield MOT & Service
              </div>
            <a
      href="https://anfieldmotservice.co.uk/"
      target="_blank"
      rel="noreferrer"
      className={styles.learnMore}
    >
      Learn More 
    </a>
    
          </div>
            <div className={styles.sponsorCard}>
            <img 
              src="/sponsors/egrs.jpeg" 
              alt="EGR" 
              style={{
                width: '400px',
                height: 'auto',
                objectFit: 'contain',
                marginBottom: '2rem',
                marginTop: '0rem'
              }}/>
            <h3>Eazy Garden Rooms</h3>
            <a
      href="https://www.eazygardenrooms.com/"
      target="_blank"
      rel="noreferrer"
      className={styles.learnMore}
    >
      Learn More 
    </a>
    
          </div>

            <div className={styles.sponsorCard}>
            <img 
              src="/sponsors/ur.jpeg" 
              alt="UR" 
              style={{
                width: '300px',
                height: 'auto',
                objectFit: 'contain',
                marginBottom: '0rem',
                marginTop: '0rem'
              }}/>
            <h3>Urban Runner</h3>
            <a
      href="https://urbanrunner.co.uk/"
      target="_blank"
      rel="noreferrer"
      className={styles.learnMore}
    >
      Learn More 
    </a>
    
          </div>

        </section>


        <h1 className={styles.sponsorsheading}>Our Media Partners</h1>
        <section className={styles.sponsorGrid}>
          {/* Repeat this card for each sponsor */}
          <div className={styles.sponsorCard}>
            <img src="/sponsors/fightd.png" alt="Concordia Clinic" />
            <h3>Fight Divison</h3>
             <a
      href="https://fightdivision.co.uk/"
      target="_blank"
      rel="noreferrer"
      className={styles.learnMore}
    >
      Learn More 
    </a>
          </div>

          <div className={styles.sponsorCard}>
            <img 
              src="/sponsors/fightr.png" 
              alt="UR" 
              style={{
                width: '250px',
                height: 'auto',
                objectFit: 'contain',
                marginBottom: '0rem',
                marginTop: '0rem'
              }}/>
            <h3>Fight Record</h3>
            <a
      href="https://fightrecord.co.uk/"
      target="_blank"
      rel="noreferrer"
      className={styles.learnMore}
    >
      Learn More 
    </a>
          </div>




        </section>



      </main>

      <Footer />
    </>
  );
}
