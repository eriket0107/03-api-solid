import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    dir: 'src',
    environmentMatchGlobs: [
      [
        './src/http/controllers/**/tests/**.spec.ts',
        './src/vitest-environment/prisma.ts',
      ],
    ],
  },
})
