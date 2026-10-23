import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    // Dev only: serve the prototypes list (public/prototypes/index.html) at /prototypes and /prototypes/
    // instead of the SPA fallback. Production hosting already resolves the folder index.
    {
      name: 'prototypes-index',
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          if (req.url && /^\/prototypes\/?(\?.*)?$/.test(req.url)) req.url = '/prototypes/index.html'
          next()
        })
      },
    },
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
