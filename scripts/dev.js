import { selectApp, startApp } from './common.js'

async function main() {
  const selected = await selectApp()
  startApp(selected)
}

main()