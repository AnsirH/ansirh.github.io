// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages User Page. Served at the domain root, so no `base` is needed.
  site: 'https://ansirh.github.io',
  vite: {
    plugins: [tailwindcss()],
  },
});
