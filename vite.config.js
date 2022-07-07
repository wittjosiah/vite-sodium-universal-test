import NodeGlobalsPolyfillPlugin from '@esbuild-plugins/node-globals-polyfill';
import NodeModulesPolyfillPlugin from '@esbuild-plugins/node-modules-polyfill';
import rollupNodePolyfills from 'rollup-plugin-polyfill-node';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
          process: true
        }),
        NodeModulesPolyfillPlugin(),
        // {
        //   name: 'sodium-fix',
        //   setup: build => {
        //     build.onResolve({ filter: /sodium-native/ }, args => {
        //       console.log({ args, js: require.resolve('sodium-javascript') });
        //       return { path: require.resolve('sodium-javascript') };
        //     });
        //   }
        // }
      ]
    }
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      plugins: [
        rollupNodePolyfills()
      ]
    }
  }
});
