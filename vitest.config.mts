import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: { tsconfigPaths: true }, // fa funzionare gli import con '@/...'
  test: { environment: 'node' },
})
