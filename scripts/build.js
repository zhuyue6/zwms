
import { readdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { build } from 'vite'
import chalk from 'chalk'
import dts from 'vite-plugin-dts';


const __dirname = fileURLToPath(new URL('.', import.meta.url))

async function compile(name) {
  console.log(chalk.green(`正在构建应用${name}，请稍等...`))
  await build({
    root: path.resolve(__dirname, `../packages/${name}`),
    plugins: [
      dts({
        dist: path.resolve(__dirname, `../packages/${name}/dist`),
        include: ['src/**/*'],
        rollupTypes: true
      })
    ],
    build: {
      lib: {
        entry: path.resolve(__dirname, `../packages/${name}/src/index.ts`),
        fileName: 'index',
        formats: ['es', 'cjs'] 
      }
    }
  })
}

async function main() {
  // 构建所有共享包packages 
  let packageDirs = readdirSync('packages')
  packageDirs = packageDirs.filter((packageDir) => {
    return packageDir !== 'shared'
  })
  // shared 单独最先构建
  compile('shared')
  for (const packageDir of packageDirs) {
    compile(packageDir)
  }
}

main()
