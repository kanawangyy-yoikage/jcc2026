import { defineConfig, loadEnv, type PluginOption } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(async ({ mode }) => {
  const plugins: PluginOption[] = [react(), tailwindcss()];
  try {
    // @ts-expect-error optional local plugin
    const mod = await import('./.vite-source-tags.js');
    plugins.push(mod.sourceTags());
  } catch {
    /* optional */
  }

  const env = loadEnv(mode, process.cwd(), ['VITE_', 'NEXT_PUBLIC_']);
  const processEnvDefines: Record<string, string> = {};
  for (const [key, value] of Object.entries(env)) {
    processEnvDefines[`process.env.${key}`] = JSON.stringify(value);
  }

  return {
    plugins,
    envPrefix: ['VITE_', 'NEXT_PUBLIC_'],
    define: processEnvDefines,
    build: {
      target: 'es2020',
      cssCodeSplit: true,
      sourcemap: false,
      minify: 'esbuild' as const,
      chunkSizeWarningLimit: 700,
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            if (id.includes('node_modules')) {
              if (id.includes('framer-motion')) return 'motion';
              if (id.includes('lenis')) return 'lenis';
              if (
                id.includes('react-hook-form') ||
                id.includes('zod') ||
                id.includes('@hookform')
              ) {
                return 'forms';
              }
              if (id.includes('@radix-ui')) return 'radix';
              if (id.includes('lucide-react')) return 'icons';
              if (id.includes('firebase') || id.includes('@firebase')) return 'firebase';
              if (id.includes('xlsx')) return 'xlsx';
              if (
                id.includes('react-dom') ||
                id.includes('/react/') ||
                id.includes('scheduler')
              ) {
                return 'react-vendor';
              }
            }
          },
        },
      },
    },
  };
})
