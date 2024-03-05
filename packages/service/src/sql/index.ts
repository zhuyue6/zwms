import mysql from 'mysql'

let db: mysql.Pool | null = null
let timer: null | NodeJS.Timeout = null
const time = 1000 * 60 * 2

interface SQLResponse {
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
  db = mysql.createPool({
    host: '127.0.0.1', // 表示连接某个服务器上的mysql数据库
    port: 3306,
    insecureAuth: true,
    user: 'root', // 数据库的用户名 （默认为root）
    password: 'root', // 数据库的密码 (默认为root)
    database: 'zwms', // 创建的本地数据库名称
  })
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
