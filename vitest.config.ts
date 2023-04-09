import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    reporters: ['default'],
    globals: true,
    onConsoleLog(log, type) {
      // eslint-disable-next-line no-console
      console.log(`${log}: ${type}`);
    },
    dangerouslyIgnoreUnhandledErrors: true,
  },
});
