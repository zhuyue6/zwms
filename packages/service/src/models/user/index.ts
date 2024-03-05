import { query } from '@/sql'

export async function login(name: string, password: string) {
  return query(
    `select * from user where name="${name}" and password="${password}"`
  )
}

export async function register(name: string, password: string) {
  return query(
    `insert into user (name, password) values ("${name}", "${password}")`
  )
}

export async function getUserById(id: number) {
  return query(`select * from user where id=${id}`)
}

export async function getUserByName(name: string) {
  return query(`select * from user where name="${name}"`)
}
