import { defineConfig, searchForWorkspaceRoot } from 'vite';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    fs: {
      allow: [
        searchForWorkspaceRoot(process.cwd()),
        path.resolve(__dirname, '../helix-design-system'),
      ],
    },
  },
  optimizeDeps: {
    // helix-design-system is workspace-linked TS/TSX source, not a pre-built
    // package — let Vite transform it directly instead of pre-bundling it.
    exclude: ['helix-design-system'],
  },
});
