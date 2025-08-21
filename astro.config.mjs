// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  vite: {
    resolve: {
      alias: {
        '~': '/src',
        '~/components': '/src/components',
        '~/layouts': '/src/layouts',
        '~/pages': '/src/pages',
        '~/assets': '/src/assets'
      }
    }
  }
});
