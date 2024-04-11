import mysql from 'mysql'
import sqlConfig from './config'
let db: mysql.Pool | null = null
let timer: null | NodeJS.Timeout = null
const time = 1000 * 60 * 2

export interface SQLResponse {
  code: number
  message?: string
  data: any
}

export async function query(sqlQuery: string) {
  connect()
  const result = await new Promise<SQLResponse>((resolve, reject) => {
    db?.query(sqlQuery, (err, data) => {
      if (err) return reject({ code: -1, message: err.message })
      resolve({ code: 0, message: 'success', data })
    })
  })
  refreshToClose()
  return result
}

export function connect() {
  if (db) {
    return
  }
  db = mysql.createPool(sqlConfig)
  refreshToClose()
  return db
}

function refreshToClose() {
  clearTimeout(timer!)
  timer = setTimeout(() => {
    close()
  }, time)
}

export function close() {
  db?.end()
  db = null
}

export default db
