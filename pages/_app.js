// pages/_app.js
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { Roboto } from 'next/font/google'
import { Cinzel } from 'next/font/google'
import { Cormorant_Garamond } from 'next/font/google'
import "../styles/global.css"
import '@mux/mux-player'
import PrivacyBanner from '../components/PrivacyBanner'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
});

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-cinzel',
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-cormorant-garamond',
});


// Your GA4 Measurement ID
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

// helper to send pageviews
function pageview(url) {
  if (window.gtag) {
    window.gtag('config', GA_ID, {
      page_path: url,
    })
  }
}

export default function App({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    // track route changes
    const handleRouteChange = (url) => {
      pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://masdaliverpool.com'
  const canonicalUrl = `${baseUrl}${router.asPath.split('?')[0]}`

  return (
    <>
      <Head>
        {/* your favicon */}
        <link rel="icon" href="/Logo-MASDA.png" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Default SEO Meta Tags for UK/Liverpool */}
        <meta name="locale" content="en_GB" />
        <meta property="og:locale" content="en_GB" />
        <meta name="twitter:card" content="summary_large_image" />
        
        {/* Enhanced Structured Data for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SportsActivityLocation",
              "@id": `${baseUrl}#organization`,
              "name": "MASDA Gym Liverpool",
              "alternateName": "MASDA Liverpool",
              "url": baseUrl,
              "logo": `${baseUrl}/masda_logo_color_wt.png`,
              "image": `${baseUrl}/masda_logo_color_wt.png`,
              "description": "World-class combat sports academy in Liverpool, UK. Training amateur and professional fighters in Muay Thai, MMA, and Boxing. UK Gym of the Year 2024.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Nexum Centre 64 St Anne Street",
                "addressLocality": "Liverpool",
                "addressRegion": "Merseyside",
                "postalCode": "L3 3DY",
                "addressCountry": "GB"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "53.4084",
                "longitude": "-2.9916"
              },
              "telephone": "+44 1234 567 890",
              "email": "info@masdaliverpool.com",
              "openingHours": "Mo-Su 09:00-21:00",
              "priceRange": "££",
              "sport": ["Muay Thai", "MMA", "Boxing", "Kickboxing", "Brazilian Jiu Jitsu"],
              "award": "UK Gym of the Year 2024 - Thai Fighter UK",
              "timezone": "Europe/London",
              "sameAs": [
                "https://www.instagram.com/masdagym/",
                "https://www.facebook.com/masdagym/",
                "https://www.youtube.com/c/MasdaGymLiverpool",
                "https://www.tiktok.com/@masdagym"
              ]
            })
          }}
        />
      </Head>

    <div className={`${roboto.variable} ${cinzel.variable} ${cormorantGaramond.variable}`}>
      <Component {...pageProps} />
      <PrivacyBanner />
    </div>
  </>
)
}
