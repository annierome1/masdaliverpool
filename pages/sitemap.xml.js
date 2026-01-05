function generateSiteMap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.masdaliverpool.com';
  
  const staticPages = [
    '',
    '/team',
    '/coaches',
    '/classes',
    '/fightnight',
    '/the_gym',
    '/sponsors',
    '/foundation',
    '/news_social',
    '/contact',
    '/commitee',
    '/privacy',
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${staticPages
       .map((url) => {
         return `
       <url>
           <loc>${baseUrl}${url}</loc>
           <lastmod>${new Date().toISOString()}</lastmod>
           <changefreq>weekly</changefreq>
           <priority>${url === '' ? '1.0' : url === '/team' || url === '/classes' ? '0.9' : '0.8'}</priority>
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  const sitemap = generateSiteMap();

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;

