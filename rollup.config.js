import rollupTypescript from '@rollup/plugin-typescript'
import rollupCommonjs from '@rollup/plugin-commonjs'
import rollupTerser from '@rollup/plugin-terser'
import rollupNodeResolve from '@rollup/plugin-node-resolve'
import rollupJson from '@rollup/plugin-json'
import rollupDts from 'rollup-plugin-dts'
import process from 'node:process'
import fsExtra from 'fs-extra'
import path from 'node:path'

function getConfig() {
  let tsconfig = fsExtra.readJSONSync(
    path.resolve(process.cwd(), './tsconfig.json'),
    { throws: false }
  )
  if (!tsconfig) {
    tsconfig = fsExtra.readJSONSync(
      path.resolve(process.cwd(), '../../tsconfig.json'),
      { throws: false }
    )
  }
  return {
    tsconfig,
  }
}

const tsconfig = getConfig().tsconfig

const moduleconfigs = {
  es: {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.esm.js',
        format: 'es',
      },
    ],
    plugins: [
      rollupCommonjs(),
      rollupJson(),
      rollupTypescript({
        compilerOptions: tsconfig.compilerOptions,
      }),
    ],
  },
  cjs: {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs',
      },
    ],
    plugins: [
      rollupJson(),
      rollupCommonjs(),
      rollupTypescript({
        compilerOptions: tsconfig.compilerOptions,
      }),
    ],
  },
  cjsmin: {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs',
      },
    ],
    plugins: [
      rollupJson(),
      rollupTerser({
        format: {
          comments: false,
        },
      }),
      rollupNodeResolve({
        preferBuiltins: false,
      }),
      rollupCommonjs(),
      rollupTypescript({
        compilerOptions: tsconfig.compilerOptions,
      }),
    ],
  },
  umd: {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.min.js',
        format: 'umd',
        name: 'PACKAGE' + process.env.PACKAGENAME,
      },
    ],
    plugins: [
      rollupCommonjs(),
      rollupJson(),
      rollupTypescript({ compilerOptions: tsconfig.compilerOptions }),
      rollupTerser({
        format: {
          comments: false,
        },
      }),
      rollupNodeResolve({
        preferBuiltins: false,
      }),
    ],
  },
  dts: {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.d.ts',
        format: 'es',
      },
    ],
    plugins: [
      rollupNodeResolve(),
      rollupJson(),
      rollupTypescript({ compilerOptions: tsconfig.compilerOptions }),
      rollupDts(),
    ],
  },
}

function buildModuleConfigs(moduleNames = ['es', 'cjs', 'umd', 'dts']) {
  const configs = []
  if (process.env.MODULENAME) {
    return [moduleconfigs[process.env.MODULENAME]]
  }
  for (const moduleName of moduleNames) {
    configs.push(moduleconfigs[moduleName])
  }
  return configs
}

export default buildModuleConfigs()
