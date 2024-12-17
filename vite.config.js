import { defineConfig } from 'vite';
import { resolve } from 'path';
import legacy from '@vitejs/plugin-legacy';

export default defineConfig({
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        'como-funciona': resolve(__dirname, 'pages/como-funciona.html'),
        'red-servicios': resolve(__dirname, 'pages/red-servicios.html'),
        'planes': resolve(__dirname, 'pages/planes.html'),
        'productos': resolve(__dirname, 'pages/productos.html'),
        'contacto': resolve(__dirname, 'pages/contacto.html'),
        'blog': resolve(__dirname, 'pages/blog.html'),
        'faq': resolve(__dirname, 'pages/faq.html')
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
});