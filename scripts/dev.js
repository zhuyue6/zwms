import inquirer from 'inquirer'
import inquirerSearchList from 'inquirer-search-list'
import { readdirSync } from 'node:fs'
import { spawn } from 'node:child_process'
import process from 'node:process'
import fsExtra from 'fs-extra'
import chalk from 'chalk'

inquirer.registerPrompt('search-list', inquirerSearchList)

function run(name) {
  const cmd = process.platform === 'win32' ? 'npx.cmd' : 'npx'
  const packageJson = fsExtra.readJSONSync(`packages/${name}/package.json`)
  spawn(cmd, ['pnpm', `--filter=${packageJson.name}`, 'dev'], {
    stdio: [0, 1, 2],
  })
}

function hasScripts(buildPackage) {
  // 有脚本的默认是应用
  const packageJson = fsExtra.readJSONSync(
    `packages/${buildPackage}/package.json`
  )
  return packageJson.scripts
    ? Object.values(packageJson.scripts).length > 0
    : false
}

async function main() {
  const packageDirs = readdirSync('packages')
  const apps = packageDirs.filter((packageDir) => hasScripts(packageDir))
  const packages = await inquirer.prompt([
    {
      type: 'search-list',
      name: 'selected',
      message: '选择启动的应用?',
      choices: apps,
    },
  ])
  const selected = packages.selected
  console.log(chalk.green(`正在启动的应用${selected}，请稍等...`))
  run(selected)
}

main()