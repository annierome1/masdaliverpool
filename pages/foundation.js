// pages/foundation.js
export async function getServerSideProps() {
  return {
    redirect: {
      destination: 'https://masdaliverpool.s3.us-east-2.amazonaws.com/masdabrouchurer.pdf',
      permanent: false,
    },
  }
}
export default function Foundation() { return null }
