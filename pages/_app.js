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

return (
  <>
    <Head>
      {/* your favicon */}
      <link rel="icon" href="/Logo-MASDA.png" />
      <link
        rel="prefetch"
        href="https://pdfwebsite.s3.us-east-2.amazonaws.com/masdabrouchurer.pdf"
        as="document"
        crossOrigin="anonymous"
      />
    </Head>

    <div className={`${roboto.variable} ${cinzel.variable} ${cormorantGaramond.variable}`}>
      <Component {...pageProps} />
      <PrivacyBanner />
    </div>
  </>
)
}
