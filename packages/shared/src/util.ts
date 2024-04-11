import moment from 'moment'

export function getUrlQuerys(): Record<string, unknown> | null {
  let query: Record<string, unknown> | null = null
  const queryArray = window.location.search
    .substring(1)
    .split('&')
    .filter((item) => item !== '')
  if (queryArray.length > 0) {
    const reg = /(\S*)=(\S*)/
    query = {}
    for (const queryItem of queryArray) {
      const r = queryItem.match(reg)
      if (r != null) {
        query[r[1]] = decodeURI(r[2])
      }
    }
  }
  return query
}

export function getUrlQuery(name: string): string | null {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  const r = window.location.search.substring(1).match(reg)
  if (r != null) {
    return decodeURI(r[2])
  }
  return null
}

export function setStorage(key: string, value: any): void {
  localStorage.setItem(key, JSON.stringify(value))
}

export function clearStorage(key?: string): void {
  if (key !== undefined) {
    return localStorage.removeItem(key)
  }
  localStorage.clear()
}

export function getStorage(key: string): any {
  let data = localStorage.getItem(key)
  try {
    data = JSON.parse(data as string)
  } catch {}
  return data
}

export function simpleDeepCopy(data: Record<string, unknown> | unknown[]) {
  return JSON.parse(JSON.stringify(data))
}

export function isEmpty(data: undefined | null | string) {
  return data === undefined || data === null || data === ''
}

export function isChrome(): boolean {
  return window.navigator.userAgent.toLocaleLowerCase().indexOf('chrome') !== -1
}

export function transformListParams(
  data: string | string[],
  type = 'string'
): string | string[] {
  let text: string | string[] = type === 'string' ? '[]' : []
  if (Array.isArray(data)) {
    text = type === 'string' ? JSON.stringify(data) : []
  } else if (typeof data === 'string' && data !== '') {
    const dataT = data.replaceAll('，', ',').split(',')
    text = type === 'string' ? JSON.stringify(dataT) : dataT
  }
  return text
}

export function formatTime(
  timeString: string | number,
  type = 'normal'
): string {
  if (!timeString) {
    return ''
  }
  if (type === 'normal') {
    return moment(timeString).format('YYYY-MM-DD')
  }
  return String(moment(timeString).valueOf())
}
