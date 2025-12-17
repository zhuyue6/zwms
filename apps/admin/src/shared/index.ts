export * as validate from './validate'

export function useToken(): [string | null, (token: string) => void] {
  const token = localStorage.getItem('token')
  function setToken(token: string) {
    localStorage.setItem('token', token)
  }
  return [token, setToken]
}