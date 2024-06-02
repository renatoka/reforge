import type { ConfigEnv, UserConfig } from 'vite';
import { defineConfig, mergeConfig } from 'vite';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import { external, getBuildConfig, getBuildDefine, pluginHotRestart } from './vite.base.config';

// https://vitejs.dev/config
export default defineConfig(env => {
  const forgeEnv = env as ConfigEnv<'build'>;
  const { forgeConfigSelf } = forgeEnv;
  const define = getBuildDefine(forgeEnv);
  const config: UserConfig = {
    build: {
      lib: {
        entry: forgeConfigSelf.entry!,
        fileName: () => '[name].js',
        formats: ['cjs'],
      },
      rollupOptions: {
        external,
      },
    },
    plugins: [pluginHotRestart('restart'), viteTsconfigPaths()],
    define,
    resolve: {
      // Load the Node.js entry.
      browserField: false,
      mainFields: ['module', 'jsnext:main', 'jsnext'],
      alias: {
        '.prisma/client/default': './node_modules/@prisma/client/default.js',
        '.prisma/client': './node_modules/@prisma/client/index.js',
      },
    },
  };

  return mergeConfig(getBuildConfig(forgeEnv), config);
});
