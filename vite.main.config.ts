import { defineConfig } from 'vite';
import { pluginHotRestart } from './vite.base.config';

// https://vitejs.dev/config
export default defineConfig({
  resolve: {
    mainFields: ['module', 'jsnext:main', 'jsnext'],
    browserField: false,
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
  },
  plugins: [pluginHotRestart('restart')]
});
