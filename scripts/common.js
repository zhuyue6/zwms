import inquirer from 'inquirer';
import inquirerSearchList from 'inquirer-search-list';
import { readdirSync } from 'node:fs';
import { spawn } from 'node:child_process';
import process from 'node:process';

inquirer.registerPrompt('search-list', inquirerSearchList);

export function getApps() {
  const packageDirs = readdirSync('apps');
  return packageDirs;
}

export function getPackages() {
  const packageDirs = readdirSync('packages');
  return packageDirs;
}

export function getArgv() {
  return process.argv[2];
}

export async function selectApp() {
  const packageDirs = getApps();

  if (packageDirs.length === 1) {
    return packageDirs[0];
  }

  const packages = await inquirer.prompt([
    {
      type: 'search-list',
      name: 'selected',
      message: 'select app?',
      choices: packageDirs,
    },
  ]);
  return packages.selected;
}

export async function selectPackages() {
  const packageDirs = getPackages();

  if (packageDirs.length === 1) {
    return packageDirs[0];
  }

  const packages = await inquirer.prompt([
    {
      type: 'search-list',
      name: 'selected',
      message: 'select app?',
      choices: packageDirs,
    },
  ]);
  return packages.selected;
}

function getNpxByPlatform() {
  return process.platform === 'win32' ? 'npx.cmd' : 'npx';
}

export async function startApp(app) {
  const cmd = getNpxByPlatform();
  spawn(cmd, ['pnpm', '--filter', `@zwms/${app}`, `start`], {
    stdio: [0, 1, 2],
    shell: true,
  });
}

export async function buildApp(app) {
  const cmd = getNpxByPlatform();
  spawn(cmd, ['pnpm', '--filter', `@zwms/${app}`, `build`], {
    stdio: [0, 1, 2],
    shell: true,
  });
}
