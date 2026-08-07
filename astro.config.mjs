import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import { remarkObsidian } from './src/plugins/remark-obsidian.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://notes.muldanhamid.com',
  markdown: {
    remarkPlugins: [remarkObsidian],
  },
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [
    mdx({
      remarkPlugins: [remarkObsidian],
    })
  ]
});