import Head from 'next/head'
import { Roboto } from 'next/font/google';
import { Cinzel } from 'next/font/google';
import "../styles/global.css"
import '@mux/mux-player' 

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

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          rel="prefetch"
          href="https://pdfwebsite.s3.us-east-2.amazonaws.com/masdabrouchurer.pdf"
          as="document"
          crossOrigin="anonymous"
        />
      </Head>

      <div className={`${roboto.variable} ${cinzel.variable}`}>
        <Component {...pageProps} />
      </div>
    </>
  )
}
