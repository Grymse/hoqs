import tsconfigPaths from 'vite-plugin-tsconfig-paths';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [tsconfigPaths()],
});
