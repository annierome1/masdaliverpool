// pages/foundation.js
export async function getServerSideProps() {
  // you can also hard-code this URL, or pull from process.env
  const pdfUrl =
    'https://masdaliverpool.s3.us-east-2.amazonaws.com/masdabrouchurer.pdf'

  return {
    redirect: {
      destination: pdfUrl,
      permanent: false,
    },
  }
}

// this component never actually renders—Next.js handles the redirect
export default function Foundation() {
  return null
}
