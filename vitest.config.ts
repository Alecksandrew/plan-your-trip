import { defineConfig } from 'vitest/config'
import { resolve } from 'path';

export default defineConfig({
  test: {
    setupFiles: ["./src/setupTest.ts"],
    environment: 'jsdom',
  },
  resolve: {
  alias: [{ find: "@", replacement: resolve(__dirname, "./src") }]
  }
});
