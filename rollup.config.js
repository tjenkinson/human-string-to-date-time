import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/string-to-date.ts',
  plugins: [typescript(), resolve(), commonjs()],
  onwarn: (e) => {
    throw new Error(e);
  },
  output: [
    {
      name: 'StateManager',
      file: 'dist/string-to-date.js',
      format: 'umd',
    },
    {
      file: 'dist/string-to-date.es.js',
      format: 'es',
    },
  ],
};
