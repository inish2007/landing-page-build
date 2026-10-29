import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'static',
  redirects: { '/home/': '/', '/process/': '/the-process/' },
  server: { host: '127.0.0.1', port: 4321 },
  vite: {
    plugins: [tailwindcss()]
  }
});
