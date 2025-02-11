const { default: Sitemap } = require('react-router-sitemap');

async function generateSitemap() {
  const { default: routes } = await import('./src/routes/routes.js');
  return new Sitemap(routes)
    .build('https://www.bluetv.xyz') // Replace with your real domain
    .save('./public/sitemap.xml');
}

generateSitemap();

