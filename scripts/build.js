import inquirer from 'inquirer'
import inquirerSearchList from 'inquirer-search-list'
import { readdirSync } from 'node:fs'
import { spawn } from 'node:child_process'
import process from 'node:process'
import fsExtra from 'fs-extra'
import chalk from 'chalk'

inquirer.registerPrompt('search-list', inquirerSearchList)

function compile(name) {
  const packageJson = fsExtra.readJSONSync(`packages/${name}/package.json`)
  if (packageJson?.scripts?.build) {
    const pnpm = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm'
    return spawn(pnpm, [
      '--filter', 
      `@zwms/${name}`, 
      'build'
    ], {
      stdio: [0, 1, 2],
    })
  }
  const cmd = process.platform === 'win32' ? 'npx.cmd' : 'npx'
  spawn(cmd, [
    'rollup', 
    '--config', 
    '../../rollup.config.js',
    '--environment',
    `PACKAGENAME:${name}${name === 'service' ? `,MODULENAME:cjs` : ''}`,
  ], {
    cwd: `packages/${name}`,
    stdio: [0, 1, 2],
  })
}

async function main() {
  const packageDirs = readdirSync('packages')
  const packages = await inquirer.prompt([
    {
      type: 'search-list',
      name: 'selected',
      message: '选择构建的应用?',
      choices: packageDirs,
    },
  ])
  const selected = packages.selected
  console.log(chalk.green(`正在构建应用${selected}，请稍等...`))
  compile(selected)
}

main()