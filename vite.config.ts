import react from '@vitejs/plugin-react'
import * as path from 'path'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import { DuxUI, DuxTheme } from '@duxweb/dux-plugin'
import mockDevServerPlugin from 'vite-plugin-mock-dev-server'

export default defineConfig({
  plugins: [
    react(),
    UnoCSS(),
    DuxUI(),
    mockDevServerPlugin({
      include: 'mock/**/*.mock.{ts,js,cjs,mjs,json,json5}',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: DuxTheme(),
      },
    },
  },
  define: {},
  server: {
    cors: false,
    proxy: {
      '^/api': {
        target: '',
      },
    },
  },
})
