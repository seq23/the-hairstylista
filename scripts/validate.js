const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const errors = [];
function exists(relativePath) {
  const full = path.join(root, relativePath);
  if (!fs.existsSync(full)) errors.push(`MISSING_FILE:${relativePath}`);
  return full;
}

const htmlPath = exists('index.html');
const cssPath = exists('assets/styles.css');
const jsPath = exists('assets/script.js');
const html = fs.existsSync(htmlPath) ? fs.readFileSync(htmlPath, 'utf8') : '';
const css = fs.existsSync(cssPath) ? fs.readFileSync(cssPath, 'utf8') : '';
const js = fs.existsSync(jsPath) ? fs.readFileSync(jsPath, 'utf8') : '';

['The Hairstylista','Nia Nowlin','Houston','Salon Meyerland','10350 S Post Oak Rd','832-360-0369','346-438-5350','appointment only','U-Part Wig Installation','Braided Styles','nia-nowlin-headshot-hero.webp','salon-blush-gold-approved.webp'].forEach((token) => {
  if (!html.includes(token)) errors.push(`MISSING_CONTENT:${token}`);
});

['#services','#signature','#gallery','#contact'].forEach((anchor) => {
  if (!html.includes(`href="${anchor}"`) && !html.includes(`id="${anchor.slice(1)}"`)) errors.push(`MISSING_ANCHOR:${anchor}`);
});

const imageRefs = [...html.matchAll(/src="([^"]+)"/g)].map((m) => m[1]).filter((src) => !src.startsWith('http'));
for (const src of imageRefs) {
  if (!fs.existsSync(path.join(root, src))) errors.push(`BROKEN_IMAGE:${src}`);
}

const galleryCount = (html.match(/class="gallery-item/g) || []).length;
if (galleryCount !== 12) errors.push(`GALLERY_COUNT_EXPECTED_12_ACTUAL_${galleryCount}`);

if (!css.includes('@keyframes softFlash')) errors.push('MISSING_FLASH_ANIMATION');
if (!css.includes('@keyframes marquee')) errors.push('MISSING_MARQUEE_ANIMATION');
if (!css.includes('@media (prefers-reduced-motion: reduce)')) errors.push('MISSING_REDUCED_MOTION_SUPPORT');
if (html.includes('TODO') || css.includes('TODO') || js.includes('TODO')) errors.push('TODO_PRESENT');
if (html.includes('YOUR_') || css.includes('YOUR_') || js.includes('YOUR_')) errors.push('PLACEHOLDER_TOKEN_PRESENT');
if (/\.env/i.test(html + css + js)) errors.push('ENV_REFERENCE_PRESENT');

if (errors.length) {
  console.error('VALIDATION_FAILED');
  for (const err of errors) console.error(err);
  process.exit(1);
}
console.log(`VALIDATION_OK images=${imageRefs.length} gallery=${galleryCount}`);
