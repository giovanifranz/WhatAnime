/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test/setup-test.ts'],
    coverage: {
      provider: 'v8',
    },
    clearMocks: true,
    collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  },
})
