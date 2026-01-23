import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const apiUrl = process.env.API_URL || process.env.AR_API_URL;

if (!apiUrl) {
  console.error('[env] Missing required environment variable: API_URL');
  process.exit(1);
}

const outPath = resolve(process.cwd(), 'public', 'env.js');
const contents =
  [
    '/* eslint-disable */',
    '// Auto-generated at build time.',
    'window.__env = window.__env || {};',
    `window.__env.API_URL = ${JSON.stringify(apiUrl)};`,
    ''
  ].join('\n');

writeFileSync(outPath, contents, 'utf8');
console.log(`[env] wrote ${outPath}`);

