// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document'

const GA_ID = process.env.GA_MEASUREMENT_ID

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
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
