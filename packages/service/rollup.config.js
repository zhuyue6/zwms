import rollupTypescript from '@rollup/plugin-typescript'
import rollupCommonjs from '@rollup/plugin-commonjs'
import rollupTerser from '@rollup/plugin-terser'
import rollupNodeResolve from '@rollup/plugin-node-resolve'
import rollupJson from '@rollup/plugin-json'
import rollupDts from 'rollup-plugin-dts';
import process from 'node:process'
import fsExtra from 'fs-extra'
import path from 'node:path'

function getConfig() {
  let tsconfig = fsExtra.readJSONSync(path.resolve(process.cwd(), './tsconfig.json'), { throws: false })
  if (!tsconfig) {
    tsconfig = fsExtra.readJSONSync(path.resolve(process.cwd(), '../../tsconfig.json'), { throws: false })
  }
  return {
    tsconfig
  }
}

const tsconfig = getConfig().tsconfig

export default [{
  input: 'src/index.ts',
  output: [{
    file: 'dist/index.js',
    format: 'cjs'
  }],
  plugins: [
    rollupJson(),
    rollupCommonjs(), 
    rollupTypescript({ compilerOptions: tsconfig.compilerOptions }),
    rollupNodeResolve()
  ]
}]