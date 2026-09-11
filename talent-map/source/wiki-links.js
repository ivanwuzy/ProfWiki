const fs = require('node:fs');
const path = require('node:path');
const links = require('./wiki-links.json');
const root = path.resolve(__dirname, '../..');

// Explicit entity matches: mentions in another article are not independent pages.
function wikiUrl(kind, name, personPath) {
  const topic = {person: 'people', context: 'people', company: 'companies'}[kind] || 'orgs';
  const file = kind === 'person' ? personPath : links[`${kind}:${name}`];
  if (!file || !file.startsWith(`wiki/${topic}/`) || !file.endsWith('.md')) return;
  if (path.relative(root, path.resolve(root, file)) !== file || !fs.existsSync(path.join(root, file))) return;
  // Match Quartz's file slug rules; absolute URLs also work in the standalone preview.
  const slug = file.slice(0, -3).split('/').map(segment => encodeURIComponent(
    segment.replace(/\s/g, '-').replace(/&/g, '-and-').replace(/%/g, '-percent').replace(/[?#]/g, '')
  )).join('/');
  return `https://ivanwuzy.github.io/ProfWiki/${slug}`;
}

module.exports = {wikiUrl};
