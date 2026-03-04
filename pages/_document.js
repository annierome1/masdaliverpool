// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document'

// NEXT_PUBLIC_ prefix is required for this to be inlined into the client bundle
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

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

          {/* Load gtag.js — tracking is blocked until user grants consent below */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}

                // Default to denied — no data is collected until the user accepts.
                gtag('consent', 'default', {
                  analytics_storage: 'denied',
                  ad_storage: 'denied',
                  wait_for_update: 500
                });

                gtag('js', new Date());
                gtag('config', '${GA_ID}', { send_page_view: false });
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
