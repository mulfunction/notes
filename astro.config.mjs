import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import { remarkObsidian } from './src/plugins/remark-obsidian.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://mulfunction.github.io',
  base: '/notes',
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