import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/human-string-to-date-time.ts',
  plugins: [typescript(), resolve(), commonjs()],
  onwarn: (e) => {
    throw new Error(e);
  },
  output: [
    {
      name: 'StateManager',
      file: 'dist/human-string-to-date-time.js',
      format: 'umd',
    },
    {
      file: 'dist/human-string-to-date-time.es.js',
      format: 'es',
    },
  ],
};
