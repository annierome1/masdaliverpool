// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document'

const GA_ID = process.env.GA_MEASUREMENT_ID

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en-GB">
        <Head>
          {/* SEO Meta Tags for UK/Liverpool */}
          <meta httpEquiv="content-language" content="en-GB" />
          <meta name="geo.region" content="GB-LIV" />
          <meta name="geo.placename" content="Liverpool" />
          <meta name="geo.position" content="53.4084;-2.9916" />
          <meta name="ICBM" content="53.4084, -2.9916" />
          <meta name="timezone" content="Europe/London" />
          
          {/* gtag.js */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
