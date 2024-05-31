import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import svgrPlugin from 'vite-plugin-svgr';
import viteTsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config
export default defineConfig({
  plugins: [
    svgrPlugin(),
    viteTsconfigPaths(),
    react({ plugins: [['@swc/plugin-styled-components', {}]] }),
  ],
});
