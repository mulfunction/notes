import { visit } from 'unist-util-visit';
import fs from 'fs';
import path from 'path';

function loadEnv() {
  const envPath = path.resolve(process.cwd(), '.env');
  const env = {};
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        env[match[1]] = match[2] || '';
      }
    });
  }
  return env;
}

// Encode each path segment: a literal '+' in a URL path is decoded as a space
// by the host, so an unencoded filename like "a +50 b.png" 404s in production.
const encodePath = (p) => p.split('/').map(encodeURIComponent).join('/');

export function remarkObsidian() {
  const env = loadEnv();
  const baseUrl = (process.env.BASE_URL || '').replace(/\/$/, '');
  const cloudBucketUrl = (env.CLOUD_BUCKET_URL || process.env.CLOUD_BUCKET_URL || '').replace(/\/$/, '');

  return (tree, file) => {
    const raw = file.value.toString();

    visit(tree, 'paragraph', (node) => {
      if (!node.children || !node.position) return;

      // Scan the original source text, not the parsed children: GFM autolink
      // parsing splits filenames like "18.13.54@2x.png" into a mailto link
      // *before* this plugin runs, hiding the wikilink from a child-by-child scan.
      const value = raw.slice(node.position.start.offset, node.position.end.offset);
      if (!value.includes('[[')) return;

      const newChildren = [];
      const regex = /!\[\[(.*?)\]\]|\[\[(.*?)\]\]/g;
      let match;
      let lastIndex = 0;

      while ((match = regex.exec(value)) !== null) {
        if (match.index > lastIndex) {
          newChildren.push({
            type: 'text',
            value: value.slice(lastIndex, match.index),
          });
        }

        if (match[1]) {
          const fileName = match[1].trim();
          const ext = fileName.split('.').pop()?.toLowerCase() || '';
          const src = cloudBucketUrl ? `${cloudBucketUrl}/${encodePath(fileName)}` : `${baseUrl}/images/${encodePath(fileName)}`;

          if (['mp4', 'webm', 'ogg', 'mov'].includes(ext)) {
            newChildren.push({
              type: 'html',
              value: `<div class="my-6"><video src="${src}" controls class="w-full rounded-2xl border border-[var(--border-card)] shadow-xl" preload="metadata"></video></div>`,
            });
          } else {
            newChildren.push({
              type: 'html',
              value: `<div class="my-6"><img src="${src}" alt="${fileName}" class="w-full rounded-2xl border border-[var(--border-card)] shadow-xl hover:scale-[1.01] transition-transform duration-300" loading="lazy" /></div>`,
            });
          }
        } else if (match[2]) {
          const pageName = match[2].trim();
          const href = `${baseUrl}/notes/${encodeURIComponent(pageName)}`;
          newChildren.push({
            type: 'html',
            value: `<a href="${href}" class="text-sky-400 underline hover:text-sky-300 transition-colors">${pageName}</a>`,
          });
        }

        lastIndex = regex.lastIndex;
      }

      if (lastIndex < value.length) {
        newChildren.push({
          type: 'text',
          value: value.slice(lastIndex),
        });
      }

      node.children = newChildren;
    });
  };
}
