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
    <div className={`${roboto.variable} ${cinzel.variable}`}>
      <Component {...pageProps} />
    </div>
  );
}
